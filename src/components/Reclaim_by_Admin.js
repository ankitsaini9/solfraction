import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";

import { programID,mint1,owner_account,user_account, PDA_state_account,metadata_program_id, paltform_state_account  } from "./ids";
const BN = require("bn.js");

export  const getTokenAccountFromMint = async (MintPubKey) => {
    const dataFromChain = await connection.getTokenLargestAccounts(
      new PublicKey(MintPubKey),
    );
    const tokenAccount = dataFromChain.value.filter((a) => a.amount === '1')[0]
      .address;
    return tokenAccount.toString();
};


export const reclaim_nft_by_admin = async(Admin_account) => {

  const user_state_pubkey = await PublicKey.findProgramAddress(
    [
      Buffer.from("user"),
      user_account.toBuffer(),
      mint1.toBuffer(),
    ],
    programID,
  );
  console.log(" user_state_pubkey : **********  :",user_state_pubkey[0].toString());


  const pda_account = await PublicKey.findProgramAddress(
    [
      Buffer.from("owner"),
      owner_account.toBuffer(),
      mint1.toBuffer(),
    ],
    programID,
  );

  console.log("pda_account account : **********  :",pda_account[0].toString());


  const edition = await PublicKey.findProgramAddress(
    [
      Buffer.from("metadata"), 
      metadata_program_id.toBuffer(),
      mint1.toBuffer(),
      Buffer.from("edition"), 
  ],
    metadata_program_id
  );

  console.log("edition : **********  :",edition[0].toString());
    

  const user_token_account = await getOrCreateAssociatedAccount(user_account, mint1, owner_account);
      
  const pda_tokenAccount = await getOrCreateAssociatedAccount(PDA_state_account, mint1, owner_account);

  // const user_native_token_account = await getOrCreateAssociatedAccount(user, token_mint, user);
  // const owner_native_token_account = await getOrCreateAssociatedAccount(owner_account, token_mint, user);


  const initStakeIx = new TransactionInstruction({
    programId: programID,
    keys: [
      { pubkey: Admin_account, isSigner: true, isWritable: true },

      { pubkey: paltform_state_account, isSigner: false, isWritable: true },

      { pubkey: owner_account, isSigner: false, isWritable: true },

      { pubkey: user_token_account, isSigner: false, isWritable: true },

      { pubkey: mint1, isSigner: false, isWritable: true },

      { pubkey: pda_account[0], isSigner: false, isWritable: true },

      { pubkey: pda_tokenAccount, isSigner: false, isWritable: true },

      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },

      { pubkey: metadata_program_id, isSigner: false, isWritable: false },

      { pubkey: edition[0], isSigner: false, isWritable: true },



    ],
    data: Buffer.from(Uint8Array.of(2

      )),


  });


      await sendTxUsingExternalSignature(
        [
          initStakeIx
        ],
        connection,
        null,
        [],
        new PublicKey(Admin_account)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));


  console.log(
    `NFT sucessfully claimed \n`
  );

  console.log("");

};
