import "./AppCard.css";

const AppCard = (props) => {
  return <div className={`appCard ${props.className}`}>{props.children}</div>;
};

export default AppCard;
