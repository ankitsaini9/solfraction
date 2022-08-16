//! Program state processor

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    program_pack::Pack,
    pubkey::Pubkey,
    system_instruction::{create_account, transfer},
    sysvar::rent::Rent,
    system_instruction
};

use crate::{
    instruction::FractionalInstruction,
    state::{FractionData, PlatformData},
};
use spl_associated_token_account::{create_associated_token_account, get_associated_token_address};


use std::str::FromStr;

pub struct Processor;

//* Program state handler.
impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = FractionalInstruction::unpack(instruction_data)?;
        match instruction {
            FractionalInstruction::InitFraction { args } => {
                msg!("Instruction: Init fraction instruction");
                Self::process_init(accounts, program_id, args)
            }
            FractionalInstruction::BuyTokens { args } => {
                msg!("Instruction:Buy tokens instruction");
                Self::process_buy_tokens(accounts, program_id, args)
            }
            FractionalInstruction::ReclaimNft {} => {
                msg!("Instruction:claim NFT");
                Self::process_reclaim(accounts, program_id)
            }
            FractionalInstruction::PlatformUpdate { amount } => {
                msg!("Instruction:Update platform_data");
                Self::process_platform_update(accounts, program_id, amount)
            }
        }
    }

    //* Process initialized
    //* @args: Fraction token , Reserve token by NFT owner.
    pub fn process_init(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        args: (u64, u64),
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        let plaform_auth = next_account_info(account_info_iter)?;

        let owner_account = next_account_info(account_info_iter)?;

        let owner_token_account = next_account_info(account_info_iter)?;

        let nft_mint = next_account_info(account_info_iter)?;

        let token_mint = next_account_info(account_info_iter)?;

        let pda_account = next_account_info(account_info_iter)?;

        let pda_nft_token_account = next_account_info(account_info_iter)?;

        let owner_nft_token_account = next_account_info(account_info_iter)?;

        let pda_token_account = next_account_info(account_info_iter)?;

        let system_program_id = next_account_info(account_info_iter)?;

        let token_program = next_account_info(account_info_iter)?;

        let associated_token_account_program_account = next_account_info(account_info_iter)?;

        let rent_sysvar_account = next_account_info(account_info_iter)?;


    
        //* Create platform authority

        let auth_prefix = "fraction platform";

        let auth_seed = &[auth_prefix.as_bytes()];

        let (authority, auth_nonce) = Pubkey::find_program_address(auth_seed, program_id);

        if *plaform_auth.key != authority {
            return Err(ProgramError::InvalidAccountData);
        }

        //* Create PDA to store the NFT and token.

        let pda_prefix = "owner";

        let pda_seed = &[
            pda_prefix.as_bytes(),
            (owner_account.key).as_ref(),
            (nft_mint.key).as_ref(),
        ];

        let (pda, nonce) = Pubkey::find_program_address(pda_seed, program_id);

        if *pda_account.key != pda {
            return Err(ProgramError::InvalidAccountData);
        }

        if pda_account.owner != program_id {
            invoke_signed(
                &create_account(
                    owner_account.key,
                    pda_account.key,
                    Rent::default().minimum_balance(FractionData::LEN),
                    FractionData::LEN as u64,
                    program_id,
                ),
                &[
                    owner_account.clone(),
                    pda_account.clone(),
                    system_program_id.clone(),
                ],
                &[&[
                    pda_prefix.as_bytes(),
                    (owner_account.key).as_ref(),
                    (nft_mint.key).as_ref(),
                    &[nonce],
                ]],
            )?;
        };

        //* Transfer NFT from owner token account to PDA(contract)
        let tranfer_instructions = spl_token::instruction::transfer(
            token_program.key,
            owner_nft_token_account.key,
            pda_nft_token_account.key,
            owner_account.key,
            &[],
            1,
        )?;

        invoke(
            &tranfer_instructions,
            &[
                owner_nft_token_account.clone(),
                pda_nft_token_account.clone(),
                owner_account.clone(),
                token_program.clone(),
            ],
        )?;
        let create_user_mint_account_ix = system_instruction::create_account_with_seed(
            owner_account.key,
            token_mint.key,
            owner_account.key,
            "new_mint",
            Rent::default().minimum_balance(spl_token::state::Mint::LEN),
            spl_token::state::Mint::LEN as u64,
            &spl_token::id(),
        );

        invoke(
            &create_user_mint_account_ix,
            &[
                owner_account.clone(),
                token_mint.clone(),
                system_program_id.clone(),
            ],
        )?;
        //* Create goverance token mint with give supply*/
        let create_mint_instructions = spl_token::instruction::initialize_mint2(
            token_program.key,
            token_mint.key,
            plaform_auth.key,
            Some(plaform_auth.key),
            2,
        )?;

        invoke_signed(
            &create_mint_instructions,
            &[
                token_mint.clone(),
                plaform_auth.clone(),
                token_program.clone(),
            ],
            &[&[auth_prefix.as_bytes(), &[auth_nonce]]],
        )?;

        //* Create associated token account */
        if owner_token_account.data_is_empty() {
            // create mint ata for user
            let create_user_ata_ix =
                create_associated_token_account(owner_account.key, owner_account.key, token_mint.key);

            invoke(
                &create_user_ata_ix,
                &[
                    owner_account.clone(),
                    owner_token_account.clone(),
                    owner_account.clone(),
                    token_mint.clone(),
                    system_program_id.clone(),
                    token_program.clone(),
                    rent_sysvar_account.clone(),
                    associated_token_account_program_account.clone(),
                ],
            )?;
        }
        if pda_token_account.data_is_empty() {
            // create mint ata for pda
            let create_user_ata_ix =
                create_associated_token_account(owner_account.key, pda_account.key, token_mint.key);

            invoke(
                &create_user_ata_ix,
                &[
                    owner_account.clone(),
                    pda_token_account.clone(),
                    pda_account.clone(),
                    token_mint.clone(),
                    system_program_id.clone(),
                    token_program.clone(),
                    rent_sysvar_account.clone(),
                    associated_token_account_program_account.clone(),
                ],
            )?;
        }
        //* Mint tokens */
        let mint_token_instruction = spl_token::instruction::mint_to(
            token_program.key,
            token_mint.key,
            pda_token_account.key,
            plaform_auth.key,
            &[],
            args.0,
        )?;

        invoke_signed(
            &mint_token_instruction,
            &[
                token_mint.clone(),
                pda_token_account.clone(),
                plaform_auth.clone(),
                token_program.clone(),
            ],
            &[&[auth_prefix.as_bytes(), &[auth_nonce]]],
        )?;
        //* Transfer Reserve  toeks to NFT owner*/
        let tranfer_instructions = spl_token::instruction::transfer(
            token_program.key,
            pda_token_account.key,
            owner_token_account.key,
            pda_account.key,
            &[],
            args.1,
        )?;

        invoke_signed(
            &tranfer_instructions,
            &[
                pda_token_account.clone(),
                owner_token_account.clone(),
                pda_account.clone(),
                token_program.clone(),
            ],
            &[&[
                pda_prefix.as_bytes(),
                (owner_account.key).as_ref(),
                (nft_mint.key).as_ref(),
                &[nonce],
            ]],
        )?;

        let mut owner_data = FractionData::unpack_unchecked(&pda_account.try_borrow_data()?)?;

        owner_data.is_initialized = true;
        owner_data.owner = *owner_account.key;
        owner_data.nft_mint = *nft_mint.key;
        owner_data.token_supply = args.0;
        owner_data.token_mint = *token_mint.key;
        owner_data.pda_token_account = *pda_token_account.key;

        FractionData::pack(owner_data, &mut pda_account.try_borrow_mut_data()?)?;
        Ok(())
    }

    //* Process rent nft functionality.
    pub fn process_buy_tokens(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        args: (u64, u64),
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        let user_account = next_account_info(account_info_iter)?;

        let owner_account = next_account_info(account_info_iter)?;

        if !user_account.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let user_token_account = next_account_info(account_info_iter)?;

        let token_mint = next_account_info(account_info_iter)?;

        let nft_mint = next_account_info(account_info_iter)?;

        let platform_auth = next_account_info(account_info_iter)?;

        let pda_account = next_account_info(account_info_iter)?;

        let pda_token_account = next_account_info(account_info_iter)?;

        let system_program_id = next_account_info(account_info_iter)?;

        let token_program = next_account_info(account_info_iter)?;

        //* Create platform authority

        let auth_prefix = "fraction platform";

        let auth_seed = &[auth_prefix.as_bytes()];

        let (authority, _auth_nonce) = Pubkey::find_program_address(auth_seed, program_id);

        if *platform_auth.key != authority {
            msg!("authrity does not match");
            return Err(ProgramError::InvalidAccountData);
        }

        //* Create PDA to store the NFT and token.

        let pda_prefix = "owner";

        let pda_seed = &[
            pda_prefix.as_bytes(),
            (owner_account.key).as_ref(),
            (nft_mint.key).as_ref(),
        ];

        let (pda, nonce) = Pubkey::find_program_address(pda_seed, program_id);

        if *pda_account.key != pda {
            msg!("pda_account_does_not_match");
            return Err(ProgramError::InvalidAccountData);
        };


        let owner_data = FractionData::unpack_unchecked(&pda_account.try_borrow_data()?)?;

        if owner_data.pda_token_account != *pda_token_account.key {
            msg!("pda_token_account_does_not_match");
            return Err(ProgramError::InvalidAccountData);
        };
        if owner_data.token_mint != *token_mint.key {
            msg!("token_mint does_not_match");
            return Err(ProgramError::InvalidAccountData);
        };
        //* args.0 == Flore prise of NFT */
        let token_prise = args.0 / (owner_data.token_supply / 100);



        let required_sol_amount = (args.1 / 100 ) * token_prise;

        //*Transfer sol amount to owner */
        invoke(
            &transfer(user_account.key, owner_account.key, required_sol_amount),
            &[
                user_account.clone(),
                owner_account.clone(),
                user_account.clone(),
                system_program_id.clone(),
            ],
        )?;
        //* Transfer tokens to user*/
        let tranfer_instructions = spl_token::instruction::transfer(
            token_program.key,
            pda_token_account.key,
            user_token_account.key,
            pda_account.key,
            &[],
            args.1,
        )?;

        invoke_signed(
            &tranfer_instructions,
            &[
                pda_token_account.clone(),
                user_token_account.clone(),
                pda_account.clone(),
                token_program.clone(),
            ],
            &[&[
                pda_prefix.as_bytes(),
                (owner_account.key).as_ref(),
                (nft_mint.key).as_ref(),
                &[nonce],
            ]],
        )?;

        FractionData::pack(owner_data, &mut pda_account.try_borrow_mut_data()?)?;

        Ok(())
    }

    //* Process reclaim Nft
    pub fn process_reclaim(accounts: &[AccountInfo], program_id: &Pubkey) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        let owner_account = next_account_info(account_info_iter)?;

        let user_account = next_account_info(account_info_iter)?;

        let user_token_account = next_account_info(account_info_iter)?;

        let user_nft_token_account = next_account_info(account_info_iter)?;

        let nft_mint = next_account_info(account_info_iter)?;

        let pda_account = next_account_info(account_info_iter)?;

        let _pda_token_account = next_account_info(account_info_iter)?;

        let pda_nft_token_account = next_account_info(account_info_iter)?;

        let token_mint = next_account_info(account_info_iter)?;

        let token_program = next_account_info(account_info_iter)?;

        let platform_auth = next_account_info(account_info_iter)?;

        let platform_token_account = next_account_info(account_info_iter)?;


        let auth_prefix = "fraction platform";

        let auth_seed = &[auth_prefix.as_bytes()];

        let (authority, _auth_nonce) = Pubkey::find_program_address(auth_seed, program_id);

        if *platform_auth.key != authority {
            msg!("authrity does not match");
            return Err(ProgramError::InvalidAccountData);
        }


        let pda_prefix = "owner";

        let pda_seed = &[
            pda_prefix.as_bytes(),
            (owner_account.key).as_ref(),
            (nft_mint.key).as_ref(),
        ];

        let (pda, pda_nonce) = Pubkey::find_program_address(pda_seed, program_id);

        if *pda_account.key != pda {
            msg!("pda_account_does_not_match");
            return Err(ProgramError::InvalidAccountData);
        };

        
        let pda_data = FractionData::unpack_unchecked(&pda_account.try_borrow_data()?)?;
    
        if *token_mint.key != pda_data.token_mint {
            msg!("token_mint_does_not_match");
            return Err(ProgramError::InvalidAccountData);
        };


        let user_token_account_info = spl_token::state::Account::unpack(
            &**user_token_account.data.borrow()
        ).unwrap();

        //Transfer 100% tokens to the contract

        if user_token_account_info.amount == pda_data.token_supply{
            let tranfer_instructions = spl_token::instruction::transfer(
                token_program.key,
                user_token_account.key,
                platform_token_account.key,
                user_account.key,
                &[],
                pda_data.token_supply,
            )?;
    
            invoke(
                &tranfer_instructions,
                &[
                    user_token_account.clone(),
                    platform_token_account.clone(),
                    user_account.clone(),
                    token_program.clone(),
                ],
            )?;
    
            //* Transfer NFT to user.
            let tranfer_instructions = spl_token::instruction::transfer(
                token_program.key,
                pda_nft_token_account.key,
                user_nft_token_account.key,
                pda_account.key,
                &[],
                1,
            )?;
            invoke_signed(
                &tranfer_instructions,
                &[
                    pda_nft_token_account.clone(),
                    user_nft_token_account.clone(),
                    pda_account.clone(),
                ],
                &[&[
                    pda_prefix.as_bytes(),
                    (owner_account.key).as_ref(),
                    (nft_mint.key).as_ref(),
                    &[pda_nonce],
                ]],
            )?;


        }
        

        FractionData::pack(pda_data, &mut pda_account.try_borrow_mut_data()?)?;

        Ok(())
    }

    //* set admin and platform fees percentage.
    pub fn process_platform_update(
        accounts: &[AccountInfo],
        program_id: &Pubkey,
        amount: u64,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();

        let admin = next_account_info(account_info_iter)?;
        //* admin should be signer
        if !admin.is_signer {
            return Err(ProgramError::MissingRequiredSignature);
        }

        let admin_key = Pubkey::from_str("EhZNShwQVY9pCwj9rK4pNZ1iXAMi4NpNDeXB8xiAjL4X").unwrap();

        if *admin.key != admin_key {
            msg!("invalid admin");
            return Err(ProgramError::InvalidAccountData);
        };
        let platform_state_accoun = next_account_info(account_info_iter)?;

        let treasury_account_info = next_account_info(account_info_iter)?;

        let system_program_id = next_account_info(account_info_iter)?;

        let pda_prefix = "admin";

        let pda_seed = &[pda_prefix.as_bytes(), (admin.key).as_ref()];

        let (pda, pda_nonce) = Pubkey::find_program_address(pda_seed, program_id);

        if *platform_state_accoun.key != pda {
            return Err(ProgramError::InvalidAccountData);
        };
        //* Create a new account for platform_state

        invoke_signed(
            &create_account(
                admin.key,
                platform_state_accoun.key,
                Rent::default().minimum_balance(PlatformData::LEN),
                PlatformData::LEN as u64,
                program_id,
            ),
            &[
                admin.clone(),
                platform_state_accoun.clone(),
                system_program_id.clone(),
            ],
            &[&[pda_prefix.as_bytes(), (admin.key).as_ref(), &[pda_nonce]]],
        )?;

        let mut platform_data =
            PlatformData::unpack_unchecked(&platform_state_accoun.try_borrow_data()?)?;

        platform_data.treasury_account = *treasury_account_info.key;
        platform_data.platform_fee = amount;
        platform_data.admin_key = *admin.key;

        PlatformData::pack(
            platform_data,
            &mut platform_state_accoun.try_borrow_mut_data()?,
        )?;
        msg!("PlatformData :{:?}", platform_data);

        Ok(())
    }
}
