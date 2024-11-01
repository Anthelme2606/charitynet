import React from "react";
import "../public/assets/css/components/userManager.css";
import { useUser } from "../app/providers/AppProvider";

const UserTable = ({users}) => {
  const {user}=useUser();
  const author=user || null;
  const handleView = (email) => {
    alert(`Viewing details for ${email}`);
  };

  const handleDisable = (email) => {
    alert(`Disabling user ${email}`);
  };

  return (
    <div className="w-100 m-0 p-0">
      <table className="m-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Pays</th>
            <th>Type d'utilisateur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.userType}</td>
              <td>
                <button
                  className="action-btn view-btn px-4"
                  onClick={() => handleView(user.email)}
                >
                  Voir
                </button>
                {author?.auth?.userType=="Admin" && (<button
            className="action-btn disable-btn px-4"
            onClick={() => handleDisable(user.email)}
          >
            Désactiver
          </button>)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards for mobile view */}
      {users.map((user, index) => (
        <div className="user-m-card" key={index}>
          <h3>{user.email}</h3>
          <p>
            <strong>Pays:</strong> {user.country}
          </p>
          <p>
            <strong>Type d'utilisateur:</strong> {user.userType}
          </p>
          <button
            className="action-btn view-btn px-4"
            onClick={() => handleView(user.email)}
          >
            Voir
          </button>
          {author?.auth?.userType=="Admin" && (<button
            className="action-btn disable-btn px-4"
            onClick={() => handleDisable(user.email)}
          >
            Désactiver
          </button>)}
        </div>
      ))}
    </div>
  );
};

export default UserTable;
