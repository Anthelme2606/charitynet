
import '../public/assets/css/components/users-card.css';
import Loader from "./Loader";
import { useQuery } from "@apollo/client";
import { GET_NON_VALID_USERS } from "../lib/queries";
const UsersCard = () => {
    const { loading, error, data } = useQuery(GET_NON_VALID_USERS, {
        fetchPolicy: "network-only",
    });

    if (loading) return <Loader />;
    if (error) return <p>Error loading data: {error.message}</p>;

    const users = data?.getNonValidUsers || [];
    
    // Create a new array to avoid mutating the original array
    const twoUsers = [...users]
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 2);

    return (
        <div className="users-container">
            {twoUsers.map(user => (
                <div className="user-card" key={user.id}>
                    <div className="user-info">
                        <div className="user-email">
                            <svg className="icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>{user.email}</span>
                        </div>
                        <div className="user-country">
                            <svg className="icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>{user.country}</span>
                        </div>
                    </div>
                    <a href={`/user/${user.id}`} className="details-link">Voir les détails</a>
                </div>
            ))}
        </div>
    );
};

export default UsersCard;
