import "./AppCard.css";

export const AppCard = (props) => {
  return <div className={`appCard ${props.className}`}>{props.children}</div>;
};
