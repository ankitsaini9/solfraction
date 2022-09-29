import { useParams } from "react-router-dom";
import "./CollectionDetails.css";
import { Container } from "react-bootstrap";
import verified from "../assets/icons/verified.svg";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AnalysisTab from "../components/AnalysisTab";
import VaultsTab from "../components/VaultsTab";

const CollectionDetails = () => {
  const { collection } = useParams(); // get the collection name from the url and do the api call to get all the details about the collection
  const dummyCollection = {
    name: collection,
    bannerImg:
      "https://assets.fractional.art/media/collections/backgrounds/Zora-platform-1.jpg",
    avatar: "https://assets.fractional.art/media/placeholder.png",
  };

  return (
    <div className="collection">
      <section>
        <div
          className="banner"
          style={{ backgroundImage: `url(${dummyCollection.bannerImg})` }}
        >
          <div className="bg-cloak"></div>
        </div>
      </section>
      <section>
        <Container className="detail">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div className="avatar">
                <img alt="" src={dummyCollection.avatar}></img>
              </div>
              <div className="ms-4">
                <div className=" d-flex align-items-center">
                  <h2 className="text-white fs-1 fw-bolder">
                    {dummyCollection.name}
                  </h2>
                  <div className="ms-2">
                    <img width="35px" alt="" src={verified}></img>
                  </div>
                </div>
                <div className="pill-shape fw-semibold">0X57f188...47eA85</div>
              </div>
            </div>
            <div className="align-self-end pb-4">
              <Button className="me-2 btn-light" variant="outline-success">
                Discord
              </Button>
              <Button className="btn-light" variant="outline-success">
                Share
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Row>
              <Col md={4}>
                <div>
                  <h4>About Collection</h4>
                  <p>
                    Read on to learn about Zora background, cultural
                    significance, and other key information.
                  </p>
                </div>
              </Col>
              <Col md={8} className="mt-2 d-flex justify-content-end ">
                <div className="pe-3 be">
                  <h5 className="f-14 fw-bold"># OF VAULTS</h5>
                  <p className="fs-5 fw-bold ">19</p>
                </div>
                <div className="px-3 be">
                  <h5 className="f-14 fw-bold">OWNERS</h5>
                  <p className="fs-5 fw-bold ">15.1K</p>
                </div>
                <div className="px-3 be">
                  <h5 className="f-14 fw-bold">MARKET CAP</h5>
                  <p className="fs-5 fw-bold mb-0">&#8801; 15,918.1</p>
                  <p className="text-muted fw-bold">$20,424,106.90</p>
                </div>
                <div className="ms-3">
                  <h5 className="f-14 fw-bold">AVG. IMPLIED VAL.</h5>
                  <p className="fs-5 fw-bold mb-0">&#8801; 936.358</p>
                  <p className="text-muted fw-bold">$20,424,106.90</p>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Tabs
            defaultActiveKey="vaults"
            id="uncontrolled-tab"
            className="mb-3"
          >
            <Tab eventKey="vaults" title="Vaults 1232" className="mt-5">
              <VaultsTab></VaultsTab>
            </Tab>
            <Tab eventKey="analysis" title="Analysis" className="mt-5">
              <AnalysisTab></AnalysisTab>
            </Tab>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default CollectionDetails;
