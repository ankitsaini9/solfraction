import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import "./VaultsTab.css";
import Form from "react-bootstrap/Form";

const VaultsTab = () => {
  return (
    <Row>
      <Col md={4}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h6>{"verification".toUpperCase()}</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">All</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">Verified</span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h6>{"status".toUpperCase()}</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">All</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">Live Auction</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">Sale Live</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">Vault Closed</span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h6>{"vault type".toUpperCase()}</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">All</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">ERC-20 Fractions</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">ERC-1155 Fractions </span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h6>{"valuation range".toUpperCase()}</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <Form.Range />
                <div className="d-flex justify-content-between mb-2">
                  <small>
                    <span id="minP">&#8801; 0</span>
                  </small>
                  <small>
                    <span id="betP">&#8801; 11.3K</span>
                  </small>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <h6>{"favourite".toUpperCase()}</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-3 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">All</span>
              </div>
              <div className="p-3 mt-2 rounded-3 rounded border border-2 border-secondary border-opacity-25">
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <span className="text-muted ms-3">Favourite</span>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
      <Col md={8}>gdsg</Col>
    </Row>
  );
};
export default VaultsTab;
