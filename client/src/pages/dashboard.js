import React, { useEffect, useState } from "react";
import AdminDashboard from "./admins/dashboard";
// import OBNLDashboard from './obnl/OBNLDashboard';
import DonorDashboard from "./donors/dashboard";
import UserDashboard from "./users/UserDashboard";
import BeneficiaireDashboard from "./beneficiaires/BeneficiareDashboard";
import { useQuery } from "@apollo/client";
import { useUser } from "../app/providers/AppProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { CURRENT_USER } from "../lib/queries";

const Dashboard = () => {
  const { user, setUser } = useUser();
  const { loading, error, data } = useQuery(CURRENT_USER, {
    skip: !user.isAuth,
    fetchPolicy: "network-only"
  });

  const [dashboardComponent, setDashboardComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If the query is successful and user data is available
    if (data && data.currentUser) {
      // Update user state with the fetched data
      setUser((prev) => ({
        ...prev,
        isAuth: true, // Set isAuth to true
        auth: {
          userType: data.currentUser.userType,
          username: data.currentUser.username,
          email: data.currentUser.email,
          country: data.currentUser.country,
          reference: data.currentUser.referenceNumber
        }
      }));
    }
  }, [data, setUser]); // Only need data and setUser as dependencies

  useEffect(() => {
    // Check for loading or error state
    if (loading) return; // Just wait for loading to finish
    if (error) {
      console.error("Error fetching user data:", error);
      navigate("/login"); // Redirect to login on error
      return;
    }

    // Check user authentication after setting user state
    if (!user.isAuth) {
      navigate("/login");
      return;
    }

    // Determine which dashboard component to render based on userType
    switch (user.auth?.userType) {
      case "Admin":
        setDashboardComponent(<AdminDashboard />);
        break;
      // Uncomment if needed
      case "Beneficiary":
        setDashboardComponent(<BeneficiaireDashboard />);
        break;
      case "User":
        setDashboardComponent(<UserDashboard />);
        break;
      // Uncomment if needed
      case "Donor":
        setDashboardComponent(<DonorDashboard />);
        break;
      default:
        setDashboardComponent(
          <p>Type d'utilisateur non reconnu. Contactez l'assistance.</p>
        );
        break;
    }
  }, [user, navigate, loading, error]);

  if (loading) return <Loader />;
  if (error) return <p>Une erreur est survenue. Veuillez réessayer.</p>;

  return <>{dashboardComponent || <Loader />}</>;
};

export default Dashboard;
