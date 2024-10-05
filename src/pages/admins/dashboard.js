import React from "react";
import "../../public/assets/css/dashboard.css";

import DashboardLayout from "../../layouts/dashboardLayout";
import useDashboard from "../../hooks/dashboardHook";
const AdminDashboard = () => {
  const {
    sidebarRef,
    sidebarToggleRef,
    isSmallScreen,
    closeToggler,
    isClosed,
  } = useDashboard(); 

  return (
    <DashboardLayout
      sidebarRef={sidebarRef}
      sidebarToggleRef={sidebarToggleRef}
      isSmallScreen={isSmallScreen}
      closeToggler={closeToggler}
      isClosed={isClosed}
    > 
      {/* {" "}
      <div className="row row-cols-1 row-cols-md-5 g-1 g-md-2 mt-1 mt-md-0">
        <div className="col">
          <DashboardCard numberValue="45" badge="vert" />
        </div>
        <div className="col">
          <div className="card h-100">
          
            <DashboardCard numberValue="45" badge="orange" />
          </div>
        </div>
        <div className="col">
          <DashboardCard numberValue="45" badge="bleu" />
        </div>
        <div className="col">
          <DashboardCard numberValue="45" badge="rouge-clair" />
        </div>
        <div className="col">
          <DashboardCard numberValue="45" badge="rouge" />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-1 g-md-2 mt-1 mt-md-2">
        <div className="col">
          <div className="card h-100 position-relative overflow-hidden">
            <div className="card-body d-flex flex-column ">
              <div className="d-flex justify-content-between">
                <div
                  className=""
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#f4f3f3",
                  }}
                >
                  <img
                    src={logo}
                    className="img-fluid"
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div>
                  <span className="fs-12">Kossi Kwatcha</span>
                </div>
              </div>

              <strong
                className="text-center fs-16 mt-2 mentor-month gradient-text"
                style={{
                  color: "black",
                  padding: "4px 8px",
                  borderRadius: "5px",
                }}
              >
                Meilleur mentor du mois
              </strong>
            </div>

            <div className="position-absolute bottom-0 start-0 w-100">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#7B61FF"
                  fillOpacity="1"
                  d="M0,256L9.2,229.3C18.5,203,37,149,55,122.7C73.8,96,92,96,111,90.7C129.2,85,148,75,166,101.3C184.6,128,203,192,222,202.7C240,213,258,171,277,138.7C295.4,107,314,85,332,85.3C350.8,85,369,107,388,128C406.2,149,425,171,443,197.3C461.5,224,480,256,498,272C516.9,288,535,288,554,277.3C572.3,267,591,245,609,234.7C627.7,224,646,224,665,234.7C683.1,245,702,267,720,256C738.5,245,757,203,775,202.7C793.8,203,812,245,831,240C849.2,235,868,181,886,133.3C904.6,85,923,43,942,32C960,21,978,43,997,90.7C1015.4,139,1034,213,1052,208C1070.8,203,1089,117,1108,101.3C1126.2,85,1145,139,1163,181.3C1181.5,224,1200,256,1218,272C1236.9,288,1255,288,1274,282.7C1292.3,277,1311,267,1329,272C1347.7,277,1366,299,1385,298.7C1403.1,299,1422,277,1431,266.7L1440,256L1440,320L1430.8,320C1421.5,320,1403,320,1385,320C1366.2,320,1348,320,1329,320C1310.8,320,1292,320,1274,320C1255.4,320,1237,320,1218,320C1200,320,1182,320,1163,320C1144.6,320,1126,320,1108,320C1089.2,320,1071,320,1052,320C1033.8,320,1015,320,997,320C978.5,320,960,320,942,320C923.1,320,905,320,886,320C867.7,320,849,320,831,320C812.3,320,794,320,775,320C756.9,320,738,320,720,320C701.5,320,683,320,665,320C646.2,320,628,320,609,320C590.8,320,572,320,554,320C535.4,320,517,320,498,320C480,320,462,320,443,320C424.6,320,406,320,388,320C369.2,320,351,320,332,320C313.8,320,295,320,277,320C258.5,320,240,320,222,320C203.1,320,185,320,166,320C147.7,320,129,320,111,320C92.3,320,74,320,55,320C36.9,320,18,320,9,320L0,320Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between">
                <span className="fs-16 fw-b">450</span>
                <span>
                  <i className="bi bi-arrow-up-right green"></i>
                </span>
              </div>

              <span className="text-center fs-12">
                {" "}
                utilisateurs sur la plateforme
              </span>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 mentorat">
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between">
                <div className="mentorat-ticket">
                  <span className="fs-12">450</span>
                </div>
                <span className="text-center fs-12">Mentorats</span>
                <span>
                  <i className="bi bi-book green fs-2"></i>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="fs-12">
                  <i className="bi bi-check-circle-fill finish fs-16"></i>
                  310 terminés
                </span>
                <span className="fs-12">
                  <i className="bi bi-clock-fill comming fs-16"></i>
                  110 à venir
                </span>
                <span className="fs-12">
                  <i className="bi bi-slash-circle-fill block fs-16"></i>
                  30 bloqués
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-1 g-md-2 mt-1 mt-md-2">
        <div className="col">
          <div className="card h-100">
            <div className="card-body text-center flex-column">
              <div className="fs-16 mb-2 d-flex justify-content-center align-items-center">
                <span className="fs-16 text-center mb-2">
                  Nombre d'inscription quotidien.
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="fs-8 ">100 Utlrs</div>
                <div className="fs-8"> 200 Utlrs</div>
                <div className="fs-8">300 Utlrs</div>
                <div className="fs-8">400 Utlrs</div>
                <div className="fs-8">50 Utlrs</div>
                <div className="fs-8 text-center">60 Utlrs</div>
                <div className="fs-8">20 Utlrs</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="banderole lun">
                  <div className="inner-stat "></div>
                </div>
                <div className="banderole mar">
                  <div className="inner-stat "></div>
                </div>
                <div className="banderole mer">
                  <div className="inner-stat "></div>
                </div>
                <div className="banderole jeu">
                  <div className="inner-stat  "></div>
                </div>
                <div className="banderole ven">
                  <div className="inner-stat "></div>
                </div>
                <div className="banderole sam">
                  <div className="inner-stat "></div>
                </div>
                <div className="banderole dim">
                  <div className="inner-stat "></div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="fs-8">Lun</div>
                <div className="fs-8">Mar</div>
                <div className="fs-8">Mer</div>
                <div className="fs-8">Jeu</div>
                <div className="fs-8">Ven</div>
                <div className="fs-8">Sam</div>
                <div className="fs-8">Dim</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
      <Diffusion /> */}
    </DashboardLayout>
  );
};
export default AdminDashboard;
