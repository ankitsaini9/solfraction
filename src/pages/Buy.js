import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import setting from "../assets/icons/setting.svg";
import InputGroup from "react-bootstrap/InputGroup";
import "./Buy.css";
import AppCard from "../components/AppCard";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useState } from "react";

const Buy = () => {
  const [openSlippage, setOpenSlippage] = useState(false);
  const [tolerance, setTolerance] = useState(0.1);

  const handleChange = (e) => {
    setTolerance(e.target.value);
  };

  return (
    <Container className="mt-100">
      <h2 className="text-center">Buy</h2>
      <p className="text-center text-muted">
        Buy other crypto assets with your crypto assets
      </p>
      <AppCard className="buyCard">
        <div className="d-flex justify-content-end">
          <div
            onClick={() => setOpenSlippage((state) => !state)}
            className="slippage"
          >
            <img alt="" src={setting}></img>
            <small className="ms-1">Set Slippage</small>
          </div>
          {openSlippage && (
            <AppCard className="slippageModal">
              <h6 className="f-14">TRANSACTION SETTINGS</h6>
              <p className="text-muted f-14">Splippage tolerance</p>
              <ButtonToolbar
                className="mb-3 d-flex justify-content-between"
                aria-label="Toolbar with Button groups"
              >
                <ButtonGroup className="me-2" aria-label="First group">
                  <Button
                    onClick={handleChange}
                    variant="outline-success"
                    value={0.1}
                    size="sm"
                  >
                    0.1%
                  </Button>
                  <Button
                    onClick={handleChange}
                    variant="outline-success"
                    value={0.5}
                    size="sm"
                  >
                    0.5%
                  </Button>
                  <Button
                    onClick={handleChange}
                    variant="outline-success"
                    value={3}
                    size="sm"
                  >
                    3%
                  </Button>
                </ButtonGroup>
                <InputGroup>
                  <Form.Control
                    onChange={handleChange}
                    placeholder="0.0"
                    type="text"
                    value={tolerance}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </ButtonToolbar>
            </AppCard>
          )}
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

          <div className="d-flex mt-3">
            <span className="text-muted f-14 flex-shrink-0">
              Estimated Gas + Fees
            </span>
            <span className="bb w-100 mb-1 mx-2"></span>
            <span className="flex-shrink-0">$0.00</span>
          </div>

          <div className="d-flex mt-3">
            <span className="text-muted f-14 flex-shrink-0">Min. recieved</span>
            <span className="bb w-100 mb-1 mx-2 "></span>
            <span className="flex-shrink-0">0 USDC</span>
          </div>
          <div className="d-grid mt-3">
            <Button disabled variant="success" size="lg">
              Review transaction
            </Button>
          </div>
        </Form>
      </AppCard>
    </Container>
  );
};

export default Buy;
