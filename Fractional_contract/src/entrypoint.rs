#![cfg(not(feature = "no-entrypoint"))]
use crate::processor::Processor;
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, pubkey::Pubkey,
};

entrypoint!(process_instruction);

//* Program entrypoint's implementation
//* @param program_id: progaram ID of the contarct.
//* @param accounts: Array of account information for the instruction.
//* @param instruction: Program instruction data.
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    Processor::process(program_id, accounts, _instruction_data)?;

    Ok(())
}
