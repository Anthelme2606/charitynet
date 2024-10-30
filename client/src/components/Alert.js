import React from "react";

const Alert = ({ variant, title, description }) => {
  const alertVariant =
    variant === "destructive" ? "alert-danger" : "alert-info";
  return (
    <div
      className={`alert ${alertVariant} d-flex align-items-center`}
      role="alert"
    >
      <div>
        <strong>{title}</strong>
        <p className="mb-0">{description}</p>
      </div>
    </div>
  );
};

export default Alert;
