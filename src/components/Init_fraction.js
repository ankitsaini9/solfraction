import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  createWithSeed,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from "./connection";
import { sendTxUsingExternalSignature } from "./externalwallet";
import { getOrCreateAssociatedAccount1,getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { programID,SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "./ids";

const BN = require("bn.js");



export  const getTokenAccountFromMint = async (MintPubKey) => {
  const dataFromChain = await connection.getTokenLargestAccounts(
    new PublicKey(MintPubKey),
  );
  const tokenAccount = dataFromChain.value.filter((a) => a.amount === '1')[0]
    .address;
  return tokenAccount.toString();
};



export const init_fraction = async (owner,mint,fractional_tokens,reserve_amount) => {

  console.log(owner, "owner_key");

  const tokenAccount = await getTokenAccountFromMint(mint);

  const owner_nft_token_account = tokenAccount;

  console.log("owner_nft_token_account",owner_nft_token_account.toString());

  const Nft_mint = new PublicKey(mint);

  console.log("mint", Nft_mint.toString());

  const token_mint= await PublicKey.createWithSeed(
    owner,
    "new_mint",
    TOKEN_PROGRAM_ID,

  );
  console.log("token_mint",token_mint.toString());


  const Authroity = await PublicKey.findProgramAddress(
    [
      Buffer.from("fraction platform"),
    ],
    programID,
  );

  console.log("Authroity",Authroity[0].toString());

  const PDA = await PublicKey.findProgramAddress(
    [
      Buffer.from("owner"),
      owner.toBuffer(),
      Nft_mint.toBuffer(),
    ],
    programID,
  );
  console.log("PDA",PDA[0].toString());


  const pda_nft_token_account = await getOrCreateAssociatedAccount1(
    PDA[0],
    Nft_mint,
    owner
  );

  const pda_token_account = await getOrCreateAssociatedAccount(
    PDA[0],
    token_mint,
    owner
  );

  const owner_token_account = await getOrCreateAssociatedAccount(
    owner,
    token_mint,
    owner
  );


  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
     
      { pubkey: Authroity[0], isSigner: false, isWritable: false },

      { pubkey: owner, isSigner: true, isWritable: true },

      { pubkey: owner_token_account, isSigner: false, isWritable: true },

      { pubkey: Nft_mint, isSigner: false, isWritable: true },

      { pubkey: token_mint, isSigner: false, isWritable: true },

      { pubkey: PDA[0], isSigner: false, isWritable: true },

      { pubkey: pda_nft_token_account, isSigner: false, isWritable: true },

      { pubkey: owner_nft_token_account, isSigner: false, isWritable: true },

      { pubkey: pda_token_account, isSigner: false, isWritable: true },

      { pubkey: SystemProgram.programId, isSigner: false, isWritable: true },

      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      {
        pubkey: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },


    ],
    data: Buffer.from(Uint8Array.of(0, 
      ...new BN(10000).toArray("le", 8),
      ...new BN(5000).toArray("le", 8),

      )),
      
  });

  await sendTxUsingExternalSignature(
    [initEscrowIx],
    connection,
    null,
    [],
    new PublicKey(owner)
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));


  console.log(`NFT fraction done sucessfully***********************  \n`);
};
