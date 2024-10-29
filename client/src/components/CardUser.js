import React from 'react';

function StatsCard({ titre, icon, value, percentage, isUp = false, isDown = false }) {
  return (
    <div className="col-xl-6 col-sm-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <div className="d-flex align-items-center align-self-start">
                <h3 className="mb-0">{value}</h3>
                <p className={`ml-2 mb-0 font-weight-medium ${isUp ? 'text-success' : isDown ? 'text-danger' : ''}`}>
                  {isUp ? `+${percentage}%` : isDown ? `-${percentage}%` : `${percentage}%`}
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className={`icon-me ${isUp ? 'icon-me-box-success' : isDown ? 'icon-me-box-danger' : ''}`}>
                <span className={`bi ${icon} icon-me-item`}></span>
              </div>
            </div>
          </div>
          <h6 className="text-muted font-weight-normal">{titre}</h6>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
