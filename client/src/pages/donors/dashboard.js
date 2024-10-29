import React from "react";
import DashboardLayout from "../../layouts/dashboardLayout";
import Card from "../../components/Card";
import LineGraph from "../../components/LineGraph";
import ProjectTileCard from "../../components/ProjectTileCard";

const DonorDashboard = () => {
  return (
    <DashboardLayout>
      <div className="w-100 dashboard-container m-0 p-0">
        <div className="row row-cols-1 row-cols-md-3 g-1">
          <div className="col">
            <Card
              titre={"Toto"}
              value={100}
              text={"nombre de compte"}
              percent={10}
            />
          </div>
          <div className="col">
            <Card
              titre={"Toto"}
              value={100}
              text={"nombre de compte"}
              percent={10}
            />
          </div>
          <div className="col">
            <Card
              titre={"Toto"}
              value={100}
              text={"nombre de compte"}
              percent={10}
            />
          </div>
        </div>
      </div>
      <div className="w-100 dashboard-container mt-2 p-4">
        <h2>Statistique</h2>
        <div className="container d-flex  justify-content-center align-items-center">
          <LineGraph />
        </div>
      </div>
      <div className="row-cols-1 row-cols-md-3 ">
        <div className="col bg-danger">
          <div className="row-cols-2 row-cols-md-2">
            <h1>Titre Tule1</h1>
            <ProjectTileCard
              title={"Project 1"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              }
              actionText={"Telecharger"}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
