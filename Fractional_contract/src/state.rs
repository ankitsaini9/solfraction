//* Lending protocol state
use arrayref::{array_mut_ref, array_ref, array_refs, mut_array_refs};
use solana_program::{
    program_error::ProgramError,
    program_pack::{IsInitialized, Pack, Sealed},
    pubkey::Pubkey,
};
#[derive(Debug, PartialEq, Copy, Clone)]
pub struct FractionData {
    pub is_initialized: bool,
    pub owner: Pubkey,
    pub nft_mint: Pubkey,
    pub pda_token_account: Pubkey,
    pub token_supply: u64,
    pub token_mint: Pubkey,
}
impl Sealed for FractionData {}
impl IsInitialized for FractionData {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}
impl Pack for FractionData {
    const LEN: usize = 137;
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, FractionData::LEN];
        let (is_initialized, owner, nft_mint, pda_token_account, token_supply, token_mint) =
            array_refs![src, 1, 32, 32, 32, 8, 32];
        let is_initialized = match is_initialized {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };
        Ok(FractionData {
            is_initialized,
            owner: Pubkey::new_from_array(*owner),
            nft_mint: Pubkey::new_from_array(*nft_mint),
            pda_token_account: Pubkey::new_from_array(*pda_token_account),
            token_supply: u64::from_le_bytes(*token_supply),
            token_mint: Pubkey::new_from_array(*token_mint),
        })
    }
    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, FractionData::LEN];
        let (
            is_initialized_dst,
            owner_dst,
            nft_mint_dst,
            pda_token_account_dst,
            token_supply_dst,
            token_mint_dst,
        ) = mut_array_refs![dst, 1, 32, 32, 32, 8, 32];
        let FractionData {
            is_initialized,
            owner,
            nft_mint,
            pda_token_account,
            token_supply,
            token_mint,
        } = self;
        is_initialized_dst[0] = *is_initialized as u8;
        owner_dst.copy_from_slice(owner.as_ref());
        nft_mint_dst.copy_from_slice(nft_mint.as_ref());
        pda_token_account_dst.copy_from_slice(pda_token_account.as_ref());
        *token_supply_dst = token_supply.to_le_bytes();
        token_mint_dst.copy_from_slice(token_mint.as_ref());
    }
}

#[derive(Debug, PartialEq, Copy, Clone)]
pub struct PlatformData {
    pub is_initialized: bool,
    pub admin_key: Pubkey,
    pub treasury_account: Pubkey,
    pub platform_fee: u64,
}
impl Sealed for PlatformData {}
impl IsInitialized for PlatformData {
    fn is_initialized(&self) -> bool {
        self.is_initialized
    }
}

impl Pack for PlatformData {
    const LEN: usize = 73;
    fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
        let src = array_ref![src, 0, PlatformData::LEN];
        let (is_initialized, admin_key, treasury_account, platform_fee) =
            array_refs![src, 1, 32, 32, 8];
        let is_initialized = match is_initialized {
            [0] => false,
            [1] => true,
            _ => return Err(ProgramError::InvalidAccountData),
        };
        Ok(PlatformData {
            is_initialized,
            admin_key: Pubkey::new_from_array(*admin_key),
            treasury_account: Pubkey::new_from_array(*treasury_account),

            platform_fee: u64::from_le_bytes(*platform_fee),
        })
    }
    fn pack_into_slice(&self, dst: &mut [u8]) {
        let dst = array_mut_ref![dst, 0, PlatformData::LEN];
        let (is_initialized_dst, admin_key_dst, treasury_account_dst, platform_fee_dst) =
            mut_array_refs![dst, 1, 32, 32, 8];
        let PlatformData {
            is_initialized,
            admin_key,
            treasury_account,
            platform_fee,
        } = self;
        is_initialized_dst[0] = *is_initialized as u8;
        admin_key_dst.copy_from_slice(admin_key.as_ref());
        treasury_account_dst.copy_from_slice(treasury_account.as_ref());

        *platform_fee_dst = platform_fee.to_le_bytes();
    }
}
