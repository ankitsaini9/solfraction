import { PublicKey } from '@solana/web3.js';
import {findAssociatedTokenAccountPublicKey} from '../components/associatedAccounts';
import { getAccountInfo } from './getAccountInfo'; 
import {createAssociatedTokenAccount} from './AssAccounts';

export const getOrCreateAssociatedAccount = async(owner, mint, payer) => {
    let pubOwner = new PublicKey(owner); 
    let pubMint = new PublicKey(mint);
    let payerPub = new PublicKey(payer);

    let associatedAddress = await findAssociatedTokenAccountPublicKey(pubOwner, pubMint)
    //console.log((associatedAddress.publickey.toString())," ****** Associated account");
    const assAcc = new PublicKey(associatedAddress);
    console.log(assAcc.toString());

    try{
         await getAccountInfo(associatedAddress);
    }catch(err){
        if(err){
            try{
                await createAssociatedTokenAccount(
                    null,
                    true,
                    pubMint,
                    pubOwner,
                    payerPub,
                )
            }catch(err){
                console.log(err);
            }
        }
    }
    return associatedAddress;
}
