import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppCard from "./AppCard";

const AnalysisTab = () => {
  return (
    <Row>
      <Col md={4} className="pe-5">
        <div className="bb">
          <h6>{"background".toUpperCase()}</h6>
        </div>
        <div className="bb my-3">
          <h6>{"Fractionalizing NFTs".toUpperCase()}</h6>
        </div>
        <div className="bb my-3">
          <h6>{"Metrics".toUpperCase()}</h6>
        </div>
        <div className="bb my-3">
          <h6>{"Risk".toUpperCase()}</h6>
        </div>
      </Col>
      <Col xs={8}>
        <AppCard className="p-4">
          <div className="lh-base">
            <h3>Background</h3>
            <p className="fs-6">
              A non-fungible token (NFT) is type of cryptographic token which
              represents ownership of a unique asset on the blockchain. No two
              NFT tokens have identical attributes, which means that the NFT
              that you hold exclusively belongs to you. It is yours, and only
              yours. Smart contracts prevent duplication and the public nature
              of blockchains ensure the scarcity of the asset.
            </p>
          </div>
          <div className="lh-base">
            <h3>Fractionalizing NFTs </h3>
            <p className="fs-6">
              There are numerous benefits of fractionalizing NFTs. For the
              original owner, fractionalizing provides increased liquidity and
              quicker, more efficient price discovery, while reducing
              volatility. Secondly, it allows buyers either priced out of
              certain pieces, or those who want to diversify their portfolio
              over a more broad collection, the ability to do so.
            </p>
          </div>
          <div className="lh-base">
            <h3>Metrics </h3>
            <p className="fs-6">
              Though trading volume is far off its momentary peak of $310M in
              May, volume has rebounded recently, exceeding $110M in
              transactions during the last month, a figure that still is higher
              now than at any point from 2020. About ⅔ of that figure is through
              primary sales, while the rest is accounted for from secondary
              sales. A more bullish indicator is the 30 day moving average for
              the amount of active wallets, which has remained steady from March
              to June, even with decreased trading volume. Over 27,000 unique
              wallets bought or sold an NFT during the month.
            </p>
          </div>
          <div className="lh-base">
            <h3>Risk </h3>
            <p className="fs-6">
              Cryptocurrencies are inherently risky, and emerging asset classes
              like NFTs are no exception towards the rule. In fact, as a whole,
              this asset class may carry even higher volatility than other
              crypto assets. While the NFT space has seen strong momentum, that
              may not always be the case; research accordingly and proceed with
              caution.
            </p>
          </div>
        </AppCard>
      </Col>
    </Row>
  );
};
export default AnalysisTab;
