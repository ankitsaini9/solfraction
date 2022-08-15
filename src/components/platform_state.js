import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from "./connection";
import { sendTxUsingExternalSignature } from "./externalwallet";
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { programID,treasury_account_info } from "./ids";

const BN = require("bn.js");


export const paltform_state = async (admin,amount) => {

  console.log(admin, "owner_key********************************");



  const paltform_state_account = await PublicKey.findProgramAddress(
    [
      Buffer.from("admin"),
      admin.toBuffer(),
    ],
    programID,
  );

  console.log("pda",paltform_state_account[0].toString());

  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
     
      { pubkey: admin, isSigner: true, isWritable: false },

      { pubkey: paltform_state_account[0], isSigner: false, isWritable: true },

      { pubkey: treasury_account_info, isSigner: false, isWritable: true },

      { pubkey: SystemProgram.programId, isSigner: false, isWritable: true },

    ],
    data: Buffer.from(Uint8Array.of(6, 
      ...new BN(amount).toArray("le", 8),

      )),
      
  });

  await sendTxUsingExternalSignature(
    [initEscrowIx],
    connection,
    null,
    [],
    new PublicKey(admin)
  );
  await new Promise((resolve) => setTimeout(resolve, 2000));


  console.log(`platform state created sucessfully***********************  \n`);
};
