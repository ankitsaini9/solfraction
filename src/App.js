

import React, { useState , useEffect} from 'react';
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { decodeMetadata, getMetadataAccount } from "./components/helper";
import { paltform_state } from './components/platform_state';
import { init_fraction } from './components/Init_fraction';
import { buy_tokens } from './components/buy_tokens';
import { withdraw_nft } from './components/withdraw_nft';


import {ProgressBar, Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bgImg from './images/bg.jpeg';
import logo from './images/logo.png';

function App() {
  const [count, setCount] = useState();
  const [pubKey, setPubKey] = useState();
  const [amount, setAmount] = useState();
  const [amount1, setAmount1] = useState();
  const [mint, setMint] = useState();
  const [nftData, setNftData] = useState();

  useEffect(() => {
    //do operation on state change
    if (pubKey !== undefined) {
      getNftData(pubKey);
    }
 },[pubKey])


  const getConnectedWallet = async()=> {    
    const provider = await window.solana;
    if(provider){
        setPubKey(provider.publicKey);
        localStorage.setItem("pubKey", provider.pubKey);
    }
    else console.log("Try to connect again");
  }

  const connectWallet = async() => {
      const provider = window.solana;
      console.log(provider);
      if(provider){
        setCount(count + 1);
        await window.solana.connect();
        window.solana.on("connect", () => console.log("connect"));
        getConnectedWallet();
      }
      else window.open("https://phantom.app/", "_blank")
  }

  const getNft = async (publicKey) => {
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

  const getNftData = async (publicKey) => {
    let nftData = await getNft(publicKey);
      let nftMintName = [];
        nftData.map(async (nft) => {
          let res = await fetch(nft.data.uri);
          let data = await res.json();
          let nftObj = {
            name: nft.data.name,
            mint: nft.mint,
            image: data.image,
          }
          // console.log(nftObj);
          nftMintName.push(nftObj);
          setNftData([...nftMintName]);
        // console.log("wallet's nft ", nftMintName);
      });
  };

  let fractionedNft = [
    {
      name: "Blocksmith Labs #24 (BSL)",
      mint: "DBKQnUZfvMmfWPtFA7bxMRJtJst96p7SHMy9zZQhNmH",
      image: "https://yhss7zgnt2sryyoxwqz7n72xo64cdfsqy6upzk5ysszmomkq6m.arweave.net/weUv5M2epRxh17Qz9v9Xd_7ghllDHqPyruJSyxzFQ8w?ext=png",
    }
  ];

  const style = {
    // backgroundImage: 'url('+bgImg+')',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    // height: '100vh',
  }

  return (
    <main style={style}>
      <Container fluid className="con">
        <Row className='justify-content-center text-center'>
          <Col className='mb-3 justify-content-center text-center'>
            {/* <a href="#"> */}
              <img
                src={logo}
                width="300"
                height="150"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
                />
            {/* </a> */}
          </Col>
            <div>
            <Button variant="primary" size="lg" onClick = {connectWallet} className="connect-wallet">Connect Wallet</Button>
            </div>
        </Row>

        <hr className="hr"></hr>
        <Row>
          {nftData ? (
            <>
            {nftData.map((nft) => (
              <div className="nftBox" key={nft.mint}>
                <div>
                  <img
                    src={nft.image}
                    width="250"
                    height="250"
                    className="d-inline-block align-top"
                    alt="NFT"
                    />
                </div>
                <div className='mt-4 text-center'>
                  <h5 className="white">{nft.name}</h5>
                </div>
                <div><hr className="hr"></hr></div>
                <div>
                <input type="text" onChange = {(e) => setAmount((e.target.value))} />
                <div className='mt-2 mb-2 text-center'>
                  <h6 className="white" >TOTAL FRACTION TOKENS</h6>
                </div>
                <input type="text" onChange = {(e) => setAmount1((e.target.value))} />
                <div className='mt-2 mb-2 text-center'>
                  <h6 className="white" >RESERVE TOKENS</h6>
                </div>
                <Button 
                  onClick = {() => init_fraction(pubKey, nft.mint, amount, amount1)}
                  variant="outline-warning" 
                  className="stakeButton"
                >
                  INIT FRACTION
                </Button>
                </div>
              </div>
            ))}
            </>
          ) : (
            <></>
          )}
        </Row>

        <Row>
          {nftData ? (
            <>
            {fractionedNft.map((nft) => (
              <div className="nftBox" key={nft.mint}>
                <div>
                  <img
                    src={nft.image}
                    width="250"
                    height="250"
                    className="d-inline-block align-top"
                    alt="NFT"
                    />
                </div>
                <div className='mt-4 text-center'>
                  <h5 className="white">{nft.name}</h5>
                </div>
                <div><hr className="hr"></hr></div>
                <div>
                <div className='text-center'>
                  <h6 className="white" >TOTAL SUPPLY: 10000</h6>
                </div>
                <input type="text" onChange = {(e) => setAmount1((e.target.value))} />
                <div className='mt-2 mb-2 text-center'>
                  <h6 className="white" >BUY FRACTION</h6>
                </div>
                <Button 
                  onClick = {() => buy_tokens(pubKey, amount, amount1)}
                  variant="outline-warning" 
                  className="stakeButton"
                >
                  BUY TOKENS
                </Button>
                </div>
              </div>
            ))}
            </>
          ) : (
            <></>
          )}
        </Row>

      </Container>
      </main>
  );
}

export default App;
