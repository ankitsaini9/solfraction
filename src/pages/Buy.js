import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import setting from "../assets/icons/setting.svg";
import InputGroup from "react-bootstrap/InputGroup";
import "./Buy.css";

const Buy = () => {
  return (
    <Container className="mt-100">
      <h2 className="text-center">Buy</h2>
      <p className="text-center text-muted">
        Buy other crypto assets with your crypto assets
      </p>
      <div className="buyCard">
        <div className="d-flex justify-content-end">
          <div className="slippage">
            <img alt="" src={setting}></img>
            <small className="ms-1">Set Slippage</small>
          </div>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="pay">
            <Form.Label className="text-muted f-14">You pay</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control placeholder="0.0" aria-label="Amount" />
              <InputGroup.Text id="basic-addon2">
                <Form.Select aria-label="Default select example">
                  <option>ETH</option>
                  <option value="1">USDT</option>
                  <option value="2">USDC</option>
                  <option value="3">WBTC</option>
                </Form.Select>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="recieve">
            <Form.Label className="text-muted f-14">You recieve</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control placeholder="0.0" aria-label="Amount" />
              <InputGroup.Text id="basic-addon2">
                <Form.Select aria-label="Default select example">
                  <option>ETH</option>
                  <option value="1">USDT</option>
                  <option value="2">USDC</option>
                  <option value="3">WBTC</option>
                </Form.Select>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Buy;
