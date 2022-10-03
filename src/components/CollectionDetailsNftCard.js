import "./CollectionDetailsNftCard.css";
import AppCard from "./AppCard";
import verified from "../assets/icons/verified.svg";

export const CollectionDetailsNftCard = (props) => {
  return (
    <AppCard className="collectionDetailsNftCard">
      <div className="bgImage">
        <img alt="" src={props.bgImage}></img>
      </div>
      <div className="top d-flex">
        <div className="bg-white px-2 d-flex align-items-center rounded">
          {props.count} NFT
        </div>
        <div className="border border-success ms-3 bg-white px-2 rounded border-2 d-flex">
          <img width="15px" className="me-1" alt="" src={verified}></img>
          <span>{props.varifiedStatus.toUpperCase()}</span>
        </div>
        <div className="ms-auto bg-secondary px-2 rounded text-white d-flex align-items-center">
          SALE LIVE
        </div>
      </div>
      <div className="ms-3 mt-2 mb-4">
        <div className="d-flex align-items-center mb-2">
          <img width="10px" className="me-2" alt="" src={verified}></img>
          <span>{props.collectionName}</span>
        </div>
        <div>
          <h5>{props.nftName}</h5>
        </div>
        <div className="address mt-3">{props.address}</div>
      </div>
      <div className="mx-3 bottom d-flex justify-content-between">
        <div>
          <h5 className="text-muted f-12">FRACTION</h5>
          <p className="fs-5 fw-bold">{props.fraction}</p>
        </div>
        <div>
          <h5 className="f-12 text-muted">COLLECTION SUPPLY</h5>
          <p className="fs-5 fw-bold">{props.collectionSupply}%</p>
        </div>
        <div>
          <h5 className="f-12 text-muted">IMPLIED VALUATION</h5>
          <p className="fs-5 fw-bold mb-0">&#8801; {props.impliedValuation}</p>
        </div>
      </div>
    </AppCard>
  );
};
