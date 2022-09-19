import { useState, useEffect } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { decodeMetadata, getMetadataAccount } from "../components/helper";
import NftCard from "../components/NftCard";
import { useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ETHIcon from "../assets/icons/ETHIcon.svg";
import InputGroup from "react-bootstrap/InputGroup";

const Fractionalize = () => {
  const pubKey = useSelector((state) => state.nft.pubKey);
  const selectedNfts = useSelector((state) => state.nft.selectedNfts);

  console.log("pk=>", pubKey);
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    //do operation on state change
    if (pubKey && Object.keys(pubKey).length) {
      getNftData(pubKey);
    } else {
      console.log("public key not found");
    }
  }, [pubKey, selectedNfts]);

  const getNftData = async (publicKey) => {
    let nftData = await getNft(publicKey);
    console.log("nft data => ", nftData);
    let nftMintName = [];
    nftData.map(async (nft) => {
      let res = await fetch(nft.data.uri);
      let data = await res.json();
      let nftObj = {
        name: nft.data.name,
        mint: nft.mint,
        image: data.image,
      };
      console.log("nft data => ", nftObj);
      nftMintName.push(nftObj);
      setNftData([...nftMintName]);
      // console.log("wallet's nft ", nftMintName);
    });
  };

  const getNft = async (publicKey) => {
    let connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    let response = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });
    let mints = await Promise.all(
      response.value
        .filter(
          (accInfo) =>
            accInfo.account.data.parsed.info.tokenAmount.uiAmount !== 0
        )
        .map((accInfo) =>
          getMetadataAccount(accInfo.account.data.parsed.info.mint)
        )
    );
    let mintPubkeys = mints.map((m) => new PublicKey(m));
    let multipleAccounts = await connection.getMultipleAccountsInfo(
      mintPubkeys
    );
    let nftMetadata = multipleAccounts
      .filter((account) => account !== null)
      .map((account) => decodeMetadata(account.data));
    return nftMetadata;
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={9}>
          <h2>Select your NFTs to fractionalize</h2>
          <p>
            Choose the NFT(s) to send to a new vault, select your desired
            fraction type, set your vault's details, then continue to
            fractionalize. Once complete, all fractions will appear in your
            wallet, Be aware, you cannot add to the NFTs in a vault once
            created.
          </p>
          <Row xs={1} md={2} className="g-0 gap-2">
            {nftData.map((nft) => (
              <NftCard
                active={selectedNfts.some((n) => n.image === nft.image)}
                name={nft.name}
                image={nft.image}
              ></NftCard>
            ))}
          </Row>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>vault details</Card.Title>
              <div className="d-flex gap-2">
                {selectedNfts.map((nft) => (
                  <div>
                    <img height={50} width={50} alt="" src={nft.image}></img>
                  </div>
                ))}
              </div>

              <Form>
                <Form.Group className="mb-3" controlId="vaultName">
                  <Form.Label className="text-muted f-14">
                    Vault Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="e.g 'Crytppunk'"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tokenSupply">
                  <Form.Label className="text-muted f-14">
                    Token Supply
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="10000"
                    // value="10000"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tokenSymbol">
                  <Form.Label className="text-muted f-14">
                    Token Symbol
                  </Form.Label>
                  <Form.Control type="text" required placeholder="CPF" />
                </Form.Group>

                <Form.Label className="text-muted f-14">
                  Reserve proce in ETH
                </Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="ETHIcon">
                    <img alt="" src={ETHIcon}></img>
                  </InputGroup.Text>

                  <Form.Control required type="number" placeholder="0.0" />
                </InputGroup>

                <Form.Label className="text-muted f-14">
                  Annual Management fee
                </Form.Label>
                <Form.Range required max={10} min={0} />
                <div className="d-flex justify-content-between mb-2">
                  <small>
                    <span id="minP">0%</span>
                  </small>
                  <small>
                    <span id="betP">10%</span>
                  </small>
                </div>
                <div className="d-grid m-2">
                  <Button variant="success">Continue</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Fractionalize;
