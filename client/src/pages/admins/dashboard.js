import React from "react";
import "../../public/assets/css/admindashboard.css";
import Table from "../../components/Table";
import Loader from "../../components/Loader";
import { useQuery } from "@apollo/client";
import { GET_ME_BENEFICIAIRE } from "../../lib/queries";
import {GET_TRACKING_PROJECTS} from "../../lib/queries";
import {GET_BENEFICIAIRE_AND_TRACKING_PROJECTS} from "../../lib/queries";
import DashboardLayout from "../../layouts/dashboardLayout";
import AdminStat from "../../components/admin-stat";
import DashboardTable from "../../components/dashboardTable";
import AdminProjectsTable from "../../components/adminProjectsTable";
import WaveCard from "../../components/wave-card";
import UsersCard from "../../components/users-card";

const AdminDashboard = () => {
  const getNonValidProjects=(projects)=> {
    return projects.filter(project => project.isValid === false);
  }
  
  const { loading, error, data } = useQuery(GET_TRACKING_PROJECTS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loader />;
  if (error) return <p>Error loading data: {error.message}</p>;

  const dashboardStat = data?.getUsersToDashboard || {};

  // Extraction des valeurs avec des valeurs par défaut en cas d'absence
  const totalUsers = dashboardStat.totalUsers || 0;
  const allDonors = dashboardStat.allDonors || 0;
  const allBeneficiaries = dashboardStat.allBeneficiaries || 0;
  const statUserMonth = dashboardStat.statUserMonth || 0;
  const statDonor = dashboardStat.statDonor || 0;
  const statBeneficiary = dashboardStat.statBeneficiary || 0;
  
  const tracking_ps = data?.getTrackingProjects?.trackingProjects || [];
  const totalCreate = data?.getTrackingProjects?.totalCreate || 0;
  const totalDelete = data?.getTrackingProjects?.totalDelete || 0;
  const totalUpdate = data?.getTrackingProjects?.totalUpdate || 0;
  const project_ps=data?.getProjets || [];
  const nonValidProjects = getNonValidProjects(project_ps);
 


  return (
    <DashboardLayout>
      <div className="w-100 dashboard-container m-0 p-0">
        <div className="row g-1">
          {/* Left Column (Notifications Card) */}
          <div className="col-md-5 h-100">
            <div className="row row-cols-1 row-cols-md-1 g-2">
              <div className="col">
                <div className="card  bg-white">
                  <div className="  position-relative">
                    <div className="notify-me">
                      <span className="bi bi-bell d-icon"></span>
                      <span className="notify-number px-2">
                        {totalCreate+totalUpdate+totalDelete}
                      </span>
                    </div>
                  </div>

                  <div className="card-body bg-white ">
                    <div className="notify-line">
                      <span className="insert text-success bi bi-plus-circle"></span>
                      <span className="number">{totalCreate}</span>
                      <span className="text">Insertions effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                    <div className="notify-line">
                      <span className="upd text-primary bi bi-pencil"></span>
                      <span className="number">{totalUpdate}</span>
                      <span className="text">Mises à jour effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                    <div className="notify-line">
                      <span className="del text-danger bi bi-trash"></span>
                      <span className="number">
                        {totalDelete}
                      </span>
                      <span className="text">Suppressions effectuées</span>
                      <span className="look px-2 bi bi-eye-fill"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <AdminStat />
              </div>
              <div className="col">
                <WaveCard/>
              </div>
              <div className="col">
                <UsersCard/>
              </div>
            </div>
          </div>

          {/* Right Column (Main Dashboard Info) */}
          <div className="col-md-7">
            <div className="row row-cols-1 row-cols-md-2 g-1">
              <div className="col">
                <div className="card h-100 text-center">
                  <div className="card-body bg-white">
                    <div className="d-flex justify-content-between">
                      <i className="bi bi-people mb-3 d-icon text-primary"></i>
                      <h5 className="card-title">Utilisateurs</h5>
                    </div>
                    <p className="card-text">
                      {totalUsers}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {statUserMonth}% par rapport au mois dernier
                    </p>
                  </div>
                  <div className="card-footer bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      className="w-100"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="blueviolet"
                        fillOpacity="1"
                        d="M0,64L11.4,69.3C22.9,75,46,85,69,106.7C91.4,128,114,160,137,181.3C160,203,183,213,206,192C228.6,171,251,117,274,112C297.1,107,320,149,343,186.7C365.7,224,389,256,411,229.3C434.3,203,457,117,480,80C502.9,43,526,53,549,64C571.4,75,594,85,617,112C640,139,663,181,686,213.3C708.6,245,731,267,754,266.7C777.1,267,800,245,823,224C845.7,203,869,181,891,176C914.3,171,937,181,960,202.7C982.9,224,1006,256,1029,234.7C1051.4,213,1074,139,1097,96C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,245.3C1257.1,288,1280,288,1303,256C1325.7,224,1349,160,1371,154.7C1394.3,149,1417,203,1429,229.3L1440,256L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100  text-center ">
                  <div className="card-body bg-white ">
                    <div className="d-flex justify-content-between">
                      <i className="bi bi-person-check mb-3 d-icon text-success"></i>
                      <h5 className="card-title">Bénéficiaires</h5>
                    </div>
                    <p className="card-text">
                      {allBeneficiaries}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +{statBeneficiary}% par rapport au mois dernier
                    </p>
                  </div>
                  <div className="card-footer bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      className="w-100"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="blueviolet"
                        fillOpacity="1"
                        d="M0,64L11.4,69.3C22.9,75,46,85,69,106.7C91.4,128,114,160,137,181.3C160,203,183,213,206,192C228.6,171,251,117,274,112C297.1,107,320,149,343,186.7C365.7,224,389,256,411,229.3C434.3,203,457,117,480,80C502.9,43,526,53,549,64C571.4,75,594,85,617,112C640,139,663,181,686,213.3C708.6,245,731,267,754,266.7C777.1,267,800,245,823,224C845.7,203,869,181,891,176C914.3,171,937,181,960,202.7C982.9,224,1006,256,1029,234.7C1051.4,213,1074,139,1097,96C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,245.3C1257.1,288,1280,288,1303,256C1325.7,224,1349,160,1371,154.7C1394.3,149,1417,203,1429,229.3L1440,256L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100  text-center ">
                  <div className="card-body bg-white ">
                    <div className="d-flex justify-content-between">
                      <i className="bi bi-heart mb-3 d-icon text-danger"></i>
                      <h5 className="card-title">Donateurs</h5>
                    </div>
                    <p className="card-text">
                      {allDonors}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      +{statDonor}% par rapport au mois dernier
                    </p>
                  </div>
                  <div className="card-footer bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      className="w-100"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="blueviolet"
                        fillOpacity="1"
                        d="M0,64L11.4,69.3C22.9,75,46,85,69,106.7C91.4,128,114,160,137,181.3C160,203,183,213,206,192C228.6,171,251,117,274,112C297.1,107,320,149,343,186.7C365.7,224,389,256,411,229.3C434.3,203,457,117,480,80C502.9,43,526,53,549,64C571.4,75,594,85,617,112C640,139,663,181,686,213.3C708.6,245,731,267,754,266.7C777.1,267,800,245,823,224C845.7,203,869,181,891,176C914.3,171,937,181,960,202.7C982.9,224,1006,256,1029,234.7C1051.4,213,1074,139,1097,96C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,245.3C1257.1,288,1280,288,1303,256C1325.7,224,1349,160,1371,154.7C1394.3,149,1417,203,1429,229.3L1440,256L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100  text-center ">
                  <div className="card-body bg-white ">
                    <div className="d-flex justify-content-between">
                      <i className="bi bi-cash-stack mb-3 d-icon text-warning"></i>
                      <h5 className="card-title">Total des dons</h5>
                    </div>
                    <p className="card-text">€ 25,000</p>
                    <p className="text-sm text-muted-foreground">
                      +15% par rapport au mois dernier
                    </p>
                  </div>
                  <div className="card-footer bg-white p-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 320"
                      className="w-100"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="blueviolet"
                        fillOpacity="1"
                        d="M0,64L11.4,69.3C22.9,75,46,85,69,106.7C91.4,128,114,160,137,181.3C160,203,183,213,206,192C228.6,171,251,117,274,112C297.1,107,320,149,343,186.7C365.7,224,389,256,411,229.3C434.3,203,457,117,480,80C502.9,43,526,53,549,64C571.4,75,594,85,617,112C640,139,663,181,686,213.3C708.6,245,731,267,754,266.7C777.1,267,800,245,823,224C845.7,203,869,181,891,176C914.3,171,937,181,960,202.7C982.9,224,1006,256,1029,234.7C1051.4,213,1074,139,1097,96C1120,53,1143,43,1166,80C1188.6,117,1211,203,1234,245.3C1257.1,288,1280,288,1303,256C1325.7,224,1349,160,1371,154.7C1394.3,149,1417,203,1429,229.3L1440,256L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Query Buttons */}
            <div className="w-100 mt-4">
              <AdminProjectsTable projects={nonValidProjects} />
              {/* <div className="row row-cols-2 row-cols-md-4 g-3">
              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de comptes créés aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de donateurs inscrits aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de bénéficiaires inscrits aujourd'hui
                </button>
              </div>

              <div className="col h-100">
                <button className="quick-query-btn w-100">
                  <i className="bi bi-filter"></i>
                  Nombre de dons effectués aujourd'hui
                </button>
              </div>
            </div> */}
            </div>
          </div>
        </div>
        {/* <Table projects={projects} /> */}
      </div>
    </DashboardLayout>
  );
};
export default AdminDashboard;
