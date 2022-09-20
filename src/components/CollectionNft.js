import { Card } from "react-bootstrap";
import "./CollectionNft.css";
import verified from "../assets/icons/verified.svg";

export const CollectionNft = (props) => {
  return (
    <Card className="collectionNft">
      <Card.Img src={props.bgImage} />
      <div className="avatar">
        <img src={props.avatar}></img>
      </div>
      <Card.Body>
        <Card.Title className="text-center mt-3">
          {props.title}
          <span className="ms-2">
            <img src={verified}></img>
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
