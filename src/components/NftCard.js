import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setSelectedNfts } from "../store/nftSlice";

const NftCard = (props) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setSelectedNfts(props.image));
  };
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title className="text-center">{props.name}</Card.Title>
      </Card.Body>
      <div className="d-grid m-2">
        <Button
          active={props.active}
          onClick={clickHandler}
          variant="outline-success"
        >
          Select
        </Button>
      </div>
    </Card>
  );
};

export default NftCard;
