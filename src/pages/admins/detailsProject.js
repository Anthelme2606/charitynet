import DashboardLayout from "../../layouts/dashboardLayout";
import DetailProject from '../../components/detailProject';
import Loader from "../../components/Loader";
import { useParams } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { GET_TRACKING_PROJECTS } from "../../lib/queries";

const DetailProjectPage = () => {
    const revealId = (hiddenId) => {
        const base64Id = hiddenId.split('-')[1]; // Récupère la partie encodée
        return atob(base64Id); // Décode l'ID
    };

    const { id } = useParams();
    const projectId = revealId(id); // Déchiffrer l'ID caché

    const { loading, error, data } = useQuery(GET_TRACKING_PROJECTS, {
        fetchPolicy: "network-only",
    });

    if (loading) return <Loader />;
    if (error) return <p>Error loading data: {error.message}</p>;

    const projects = data?.getProjets || [];
    const project = projects.find(p => p.id === parseInt(projectId)); // Rechercher le projet correspondant

    if (!project) {
        return (
            <DashboardLayout>
                <p>Projet non trouvé</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <DetailProject project={project} />
        </DashboardLayout>
    );
};

export default DetailProjectPage;
