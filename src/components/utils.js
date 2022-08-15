import * as BufferLayout from "buffer-layout";


       const publicKey = (property = "publicKey") => {
        return BufferLayout.blob(32, property);
      }
 const uint64 = (property = "uint64") => {
  return BufferLayout.blob(8, property);
};  


  export const OWNER_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("owner"),
    publicKey("nftmint"),
    publicKey("borrowerpubkey"),
    uint64("rentalamount"),
    uint64("rentaltimeperiod"),
    uint64("status"),
  ]);


  export const USER_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("user"),
    publicKey("owneraccount"),
    publicKey("nftpda"),
    uint64("rentingtimestamp"),
  ]);



  export const BIDDER_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("bidder"),
    publicKey("auctionStateAccount"),
    uint64("bidAmount"),
  ]);