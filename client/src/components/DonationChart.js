import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import useIsMobile from '../hooks/mobileHook';
Chart.register(...registerables);

const DonationChart = () => {
    const isMobile =useIsMobile();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Obtenir le mois et l'année actuels
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 = Janvier, 11 = Décembre

    // Liste des mois jusqu'au mois actuel
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = monthNames.slice(0, currentMonth + 1); // Mois jusqu'à aujourd'hui

    // Objet de données des contributions dynamiques
    const contributionsData = {
      averageContributions: [150, 220, 300, 320, 400, 420, 470, 480, 500, 550, 590, 630].slice(0, currentMonth + 1),
      currentDonorContributions: [200, 250, 310, 360, 390, 450, 470, 510, 530, 570, 600, 620].slice(0, currentMonth + 1)
    };

    // Initialiser le graphique avec Chart.js
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Contribution Moyenne',
            data: contributionsData.averageContributions,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(255, 255, 192, 0.2)',
            fill: true
          },
          {
            label: 'Contribution du Donateur Actuel',
            data: contributionsData.currentDonorContributions,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: { display: true, text: 'Mois' }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Montant en $' }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });

    // Fonction pour mettre à jour dynamiquement les données
    const updateData = (newAverage, newCurrentDonor) => {
      chartInstance.current.data.datasets[0].data = newAverage;
      chartInstance.current.data.datasets[1].data = newCurrentDonor;
      chartInstance.current.update();
    };

    // Exemple d'utilisation de la fonction d'updateData (si des données changent)
    const timeoutId = setTimeout(() => {
      const newAverage = [10, 10, 310, 330, 10, 430, 480, 490, 510, 560, 600, 640].slice(0, currentMonth + 1);
      const newCurrentDonor = [210, 260, 320, 170, 400, 460, 480, 520, 540, 580, 610, 630].slice(0, currentMonth + 1);
      updateData(newAverage, newCurrentDonor);
    }, 1000); // Met à jour les données après 5 secondes

    // Nettoyage pour éviter les fuites de mémoire
    return () => {
      clearTimeout(timeoutId);
      chartInstance.current.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h2>Suivi des Dons Mensuels</h2>
      <div id="chartContainer" style={{ width: '100%'}}>
        <canvas ref={chartRef} width={`${isMobile? '300': '800'}`} height={`${isMobile?'200':'300'}`}></canvas>
      </div>
    </div>
  );
};

export default DonationChart;
