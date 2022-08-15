import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { decodeMetadata, getMetadataAccount } from "./helper";

export const getNft = async (publicKey) => {
  console.log("working");
  let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  let response = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });
  let mints = await Promise.all(
    response.value
      .filter(
        (accInfo) => accInfo.account.data.parsed.info.tokenAmount.uiAmount !== 0
      )
      .map((accInfo) =>
        getMetadataAccount(accInfo.account.data.parsed.info.mint)
      )
  );
  let mintPubkeys = mints.map((m) => new PublicKey(m));
  let multipleAccounts = await connection.getMultipleAccountsInfo(mintPubkeys);
  let nftMetadata = multipleAccounts
    .filter((account) => account !== null)
    .map((account) => decodeMetadata(account.data));
  return nftMetadata;
};

export const getNftData = async (publicKey) => {
  let nftData = await getNft(publicKey);
  console.log(nftData);
  let nftMintName = [];

  nftData.map(async (nft) => {
    let res = await fetch(nft.data.uri);
    let data = await res.json();
    let nftObj = {
      name: nft.data.name,
      mint: nft.mint,
      image: data.image,
    };
    nftMintName.push(nftObj);
    console.log(nftMintName);
  });
};
