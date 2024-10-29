import React from "react";
import "../public/assets/css/components/loader.css";
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="loader-container">
        <div className="c-loader"></div>
        {/* <span className="text-center-cn">
          <i className="charity">C</i>
          <i className="net">N</i>
        </span> */}
      </div>
    </div>
  );
};
export default Loader;
