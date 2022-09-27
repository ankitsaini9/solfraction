import { Card } from "react-bootstrap";
import "./CollectionNft.css";
import verified from "../assets/icons/verified.svg";
import { useNavigate } from "react-router-dom";

export const CollectionNft = (props) => {
  const navigate = useNavigate();

  const showNftDetails = () => {
    navigate(`/collections/${props.title}`);
  };

  return (
    <Card className="collectionNft" onClick={showNftDetails}>
      <Card.Img alt="" className="center-cropped" src={props.bgImage} />
      <div className="avatar">
        <img alt="" src={props.avatar}></img>
      </div>
      <Card.Body>
        <Card.Title className="text-center mt-5">
          {props.title}
          <span className="ms-2">
            <img alt="" src={verified}></img>
          </span>
        </Card.Title>
        <div className="bb my-3"></div>
        <Card.Text className="d-flex">
          <div>
            <div className="text-muted"># of vaults</div>
            <div>{props.vault}</div>
          </div>
          <div className="mx-5">
            <div className="text-muted"># of NFTs</div>
            <div>{props.NFTs}</div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
