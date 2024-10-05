import React from "react";
import "../public/assets/css/world.css";
const World = () => {
  return (
    
      <div className="world-content d-flex flex-column p-0 m-0 w-100 g-4">
      <div className="world-title">
    <h2 className="text-center mb-5">
    <span className="stylized-p">P</span>rocessus de Don de Bienfaisance</h2>
   </div>

        <div className="world m-5">
          <div className="line top-center"></div>
          <div className="rond-50 top-center">
            <i className="bi bi-pen"></i>
          </div>
          <div className="line-w left-center"></div>
          <div className="rond-50 left-center">
            <i className="bi bi-hand-thumbs-up"></i>
          </div>
          <div className="rond-50 right-center">
            <i className="bi bi-box"></i>
          </div>
          <div className="rond-50 bottom-center">
            <i className="bi bi-graph-up"></i>
          </div>
          <div className="globe-wrapper">
            <i className="bi bi-globe globe-center"></i>
          </div>
          <div className="line-w right-center"></div>

          <div className="line bottom-center"></div>
        </div>
        <div className="world-description py-5 px-4">
          <p className="lead">
            Le processus commence par les bénéficiaires qui partagent leur
            projet ou leurs besoins, attirant ainsi l’attention des donateurs et
            des organisations à but non lucratif, qui viennent ensuite apporter
            leur soutien financier ou matériel, suivis par la distribution des
            dons, et enfin, un suivi est réalisé pour évaluer l'impact de l'aide
            apportée.
          </p>
        </div>
      </div>
    
  );
};
export default World;
