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
import { getOrCreateAssociatedAccount1 } from "./getOrCreateAssociatedAccount";
import { programID,owner,NFT_MINT } from "./ids";

const BN = require("bn.js");




export const buy_tokens = async (user,flore_prise,tokens_to_buy) => {

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


  
  const pda_token_account = await getOrCreateAssociatedAccount1(
    PDA[0],
    token_mint,
    owner
  );

  const user_token_account = await getOrCreateAssociatedAccount1(
    user,
    token_mint,
    user
  );


  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
     
      { pubkey: user, isSigner: true, isWritable: true },

      { pubkey: owner, isSigner: false, isWritable: true },

      { pubkey: user_token_account, isSigner: false, isWritable: true },

      { pubkey: token_mint, isSigner: false, isWritable: true },

      { pubkey: NFT_MINT, isSigner: false, isWritable: true },


      { pubkey: Authroity[0], isSigner: false, isWritable: false },

      { pubkey: PDA[0], isSigner: false, isWritable: true },

      { pubkey: pda_token_account, isSigner: false, isWritable: true },

      { pubkey: SystemProgram.programId, isSigner: false, isWritable: true },

      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },


    ],
    data: Buffer.from(Uint8Array.of(1, 
      ...new BN(flore_prise).toArray("le", 8),
      ...new BN(tokens_to_buy).toArray("le", 8),

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
