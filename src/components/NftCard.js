import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { setSelectedNfts } from "../store/nftSlice";
import { useState } from "react";

const NftCard = (props) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(setSelectedNfts(props));
    setSelected((state) => !state);
  };
  return (
    <Card style={{ width: "12rem" }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title className="text-center">{props.name}</Card.Title>
      </Card.Body>
      <div className="d-grid m-2">
        <Button
          active={selected}
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
