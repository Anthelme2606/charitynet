import React from "react";

const Card = ({ title, children }) => {
  return (
    <div className="card w-100 mx-auto" style={{ maxWidth: "28rem" }}>
      {title && <h5 className="card-header">{title}</h5>}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Card;
