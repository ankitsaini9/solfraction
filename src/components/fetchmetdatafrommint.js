import {decodeMetadata, getMetadataAccount} from "./helper";
import { PublicKey} from "@solana/web3.js";
import {connection} from "./connection"

export const fetchMetadata = async (mint) => {

  let mintMetaDataAccount = await getMetadataAccount(mint);
  
  let mintPubKeys = new PublicKey(mintMetaDataAccount);
  let account = await connection.getAccountInfo(mintPubKeys);
  let accArray = [account];
  let nftMetadata = accArray.filter(account => account !== null).map(account => decodeMetadata(account.data));
  return nftMetadata
}