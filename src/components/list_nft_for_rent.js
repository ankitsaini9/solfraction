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
import { programID } from "./ids";

const BN = require("bn.js");



export  const getTokenAccountFromMint = async (MintPubKey) => {
  const dataFromChain = await connection.getTokenLargestAccounts(
    new PublicKey(MintPubKey),
  );
  const tokenAccount = dataFromChain.value.filter((a) => a.amount === '1')[0]
    .address;
  return tokenAccount.toString();
};





export const list_for_rent = async (owner,mint,amount) => {

  console.log(owner, "owner_key");

  const tokenAccount = await getTokenAccountFromMint(mint);

  const owner_token_account = tokenAccount;

  const Nft_mint = new PublicKey(mint);

  const PDA = await PublicKey.findProgramAddress(
    [
      Buffer.from("owner"),
      owner.toBuffer(),
      Nft_mint.toBuffer(),
    ],
    programID,
  );

  console.log("pda",PDA[0].toString());


  const pda_token_account = await getOrCreateAssociatedAccount(
    PDA[0],
    Nft_mint,
    owner
  );
  console.log(Uint8Array.of(0, 
    ...new BN(amount).toArray("le", 8),
    ...new BN(1200).toArray("le", 8),

    ))

  const initEscrowIx = new TransactionInstruction({
    programId: programID,
    keys: [
     
      { pubkey: owner, isSigner: true, isWritable: false },

      { pubkey: owner_token_account, isSigner: false, isWritable: true },

      { pubkey: Nft_mint, isSigner: false, isWritable: true },

      { pubkey: PDA[0], isSigner: false, isWritable: true },

      { pubkey: pda_token_account, isSigner: false, isWritable: true },

      { pubkey: SystemProgram.programId, isSigner: false, isWritable: true },

      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },

    ],
    data: Buffer.from(Uint8Array.of(0, 
      ...new BN(amount).toArray("le", 8),
      ...new BN(1200).toArray("le", 8),

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


  console.log(`NFT listed for rent sucessfully***********************  \n`);
};
