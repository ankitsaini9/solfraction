import { useParams } from "react-router-dom";
import "./CollectionDetails.css";
import { Container } from "react-bootstrap";
import verified from "../assets/icons/verified.svg";
import Button from "react-bootstrap/Button";

const CollectionDetails = () => {
  const { collection } = useParams(); // get the collection name from the url and do the api call to get all the details about the collection
  const dummyCollection = {
    name: collection,
    bannerImg:
      "https://assets.fractional.art/media/collections/backgrounds/ENS.jpg",
    avatar: "https://assets.fractional.art/media/placeholder.png",
  };

  return (
    <div className="collection">
      <div
        className="banner"
        style={{ backgroundImage: `url(${dummyCollection.bannerImg})` }}
      ></div>
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
        <div></div>
      </Container>
    </div>
  );
};

export default CollectionDetails;
