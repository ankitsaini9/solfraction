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
import { getOrCreateAssociatedAccount } from "./creat_ata";
import { programID,NFT_MINT,owner } from "./ids";

const BN = require("bn.js");

export const withdraw_nft = async (user) => {


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
      NFT_MINT.toBuffer(),
    ],
    programID,
  );
  console.log("PDA",PDA[0].toString());


  const pda_nft_token_account = await getOrCreateAssociatedAccount(
    PDA[0],
    NFT_MINT,
    user
  );

  const user_nft_token_account = await getOrCreateAssociatedAccount(
    PDA[0],
    NFT_MINT,
    user
  );

  const pda_token_account = await getOrCreateAssociatedAccount(
    PDA[0],
    token_mint,
    user
  );

  const user_token_account = await getOrCreateAssociatedAccount(
    user,
    token_mint,
    user
  );

  const platform_token_accoun = await getOrCreateAssociatedAccount(
    user,
    token_mint,
    user
  );

  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
     
      { pubkey: owner, isSigner: false, isWritable: true },

      { pubkey: user, isSigner: true, isWritable: true },

      { pubkey: user_token_account, isSigner: false, isWritable: true },

      { pubkey: user_nft_token_account, isSigner: false, isWritable: true },

      { pubkey: NFT_MINT, isSigner: false, isWritable: true },

      { pubkey: PDA[0], isSigner: false, isWritable: true },

      { pubkey: pda_token_account, isSigner: false, isWritable: true },

      { pubkey: pda_nft_token_account, isSigner: false, isWritable: true },

      { pubkey: token_mint, isSigner: false, isWritable: true },

      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },

      { pubkey: Authroity[0], isSigner: false, isWritable: true },

      { pubkey: platform_token_accoun, isSigner: false, isWritable: true },


    

    ],
    data: Buffer.from(Uint8Array.of(2, 
    
      )),
      
  });

  await sendTxUsingExternalSignature(
    [initEscrowIx],
    connection,
    null,
    [],
    new PublicKey(user)
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));


  console.log(`NFT fraction done sucessfully***********************  \n`);
};
