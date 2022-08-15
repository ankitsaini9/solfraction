// use directly
// Fetch all listing by all users
import { PublicKey } from "@solana/web3.js";
import { connection } from "./connection";
import { programID } from "./ids";
import { OWNER_DATA_LAYOUT } from "./utils";

const BN = require("bn.js");


export const fetch_data_live_listing = async (user) => {
  const gokulID = new PublicKey("GshJ24zEfhFaid4PaU2AMaoT5WUz39oeeofw5vr31u7C");
  const currentlinstingaccounts = await connection.getProgramAccounts(
    programID,
    {
      filters: [

        {
          dataSize: 121, // number of bytes
        },
        {
          memcmp: {
            offset: 1 + // is_initialized,
              32 +      // seller acc
              32 +
              32 +
              8 +
              8,
            bytes: "2"
          },
        },
      ],
    }
  );

  console.log("live listed accounts : ", currentlinstingaccounts);


  const decodedData = currentlinstingaccounts.map((accountData) => {
    if (accountData.account.data) {
      const decodedTempData = OWNER_DATA_LAYOUT.decode(
        accountData.account.data
      );

      return {
        isInitialized: decodedTempData.isInitialized,
        owner: new PublicKey(decodedTempData.owner).toString(),
        nft_mint: new PublicKey(
          decodedTempData.nftmint
        ).toString(),
        borrower_pubkey: new PublicKey(decodedTempData.borrowerpubkey).toString(),
        rental_amount: (new BN(decodedTempData.rentalamount, 10, "le")).toString(),
        rental_time_period: (new BN(decodedTempData.rentaltimeperiod, 10, "le")).toString(),
        status: (new BN(decodedTempData.status, 10, "le")).toString(),
        
      };
    }
  });
  console.log("data",decodedData);

}

