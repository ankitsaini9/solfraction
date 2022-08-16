#![allow(clippy::too_many_arguments)]

use solana_program::program_error::ProgramError;
use std::mem;

#[repr(C)]
#[derive(Clone, Debug, PartialEq)]
pub enum FractionalInstruction {
    //* Init NFT fraction
    InitFraction { args: (u64, u64) },

    //* Buy NFT tokens
    BuyTokens { args: (u64, u64) },

    //* withdraw NFT
    ReclaimNft,

    //* Update platform data
    PlatformUpdate { amount: u64 },
}

//* Packing and unpacking for the instructions data.
//* References: https://github.com/solana-labs/solana-program-library/blob/7caf27cca6a9f58055f93517774318eb2b2f97bf/token-swap/program/src/instruction.rs#L190

impl FractionalInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input
            .split_first()
            .ok_or(ProgramError::InvalidAccountData)?;

        Ok(match tag {
            0 => Self::InitFraction {
                args: Self::unpack_data(rest)?,
            },
            1 => Self::BuyTokens {
                args: Self::unpack_data(rest)?,
            },

            2 => Self::ReclaimNft,

            3 => Self::PlatformUpdate {
                amount: Self::unpack_amount(rest)?,
            },

            _ => return Err(ProgramError::InvalidAccountData),
        })
    }

    pub fn pack(&self) -> Vec<u8> {
        let mut buf = Vec::with_capacity(mem::size_of::<Self>());
        match &*self {
            Self::InitFraction { args } => {
                buf.push(0);
                buf.extend_from_slice(&args.0.to_le_bytes());
                buf.extend_from_slice(&args.1.to_le_bytes());
            }
            Self::BuyTokens { args } => {
                buf.push(1);
                buf.extend_from_slice(&args.0.to_le_bytes());
                buf.extend_from_slice(&args.1.to_le_bytes());
            }

            Self::PlatformUpdate { amount } => {
                buf.push(3);
                buf.extend_from_slice(&amount.to_le_bytes());
            }

            _ => todo!(),
        }
        buf
    }

    fn unpack_data(input: &[u8]) -> Result<(u64, u64), ProgramError> {
        let amount1 = input
            .get(0..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(ProgramError::InvalidInstructionData)?;
        let amount2 = input
            .get(8..16)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(ProgramError::InvalidInstructionData)?;

        Ok((amount1, amount2))
    }

    fn unpack_amount(input: &[u8]) -> Result<u64, ProgramError> {
        let amount = input
            .get(..8)
            .and_then(|slice| slice.try_into().ok())
            .map(u64::from_le_bytes)
            .ok_or(ProgramError::InvalidAccountData)?;
        Ok(amount)
    }
}
