import React from "react";

const ProjectTileCard = ({
  title,
  description,
  imageUrl,
  actionText,
  actionLink
}) => {
  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className=" flex  justify-content-between items-center">
          <a href="http://" className="btn  btn-primary">
            <i class="bi bi-eye"></i>
          </a>
          <a href="http://" className="btn  btn-primary">
            <i class="bi bi-download"></i>
          </a>
        </div>
        <a href={actionLink} className="btn btn-primary">
          {actionText}
        </a>
      </div>
    </div>
  );
};

export default ProjectTileCard;
