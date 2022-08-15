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
import { programID, mint1 } from "./ids";

const BN = require("bn.js");

export const update_time = async (owner,amount) => {


  const PDA = await PublicKey.findProgramAddress(
    [
      Buffer.from("owner"),
      owner.toBuffer(),
      mint1.toBuffer(),
    ],
    programID,
  );

  console.log("pda",PDA[0].toString());


  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
      { pubkey: owner, isSigner: false, isWritable: true },

      { pubkey: PDA[0], isSigner: false, isWritable: true },


    ],
    data: Buffer.from(Uint8Array.of(5, 
      ...new BN(amount).toArray("le", 8),
      ...new BN(1400).toArray("le", 8),

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


  console.log(`Time and amount updated successfully \n`);
};
