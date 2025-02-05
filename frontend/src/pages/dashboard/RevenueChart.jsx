import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const revenueData = [50, 70, 80, 60, 75, 90, 65, 87, 96, 102, 110, 115];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'USD',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.7)', 
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-center text-2xl font-bold text-gray-800 mb-4'>Monthly Revenue</h2>
      <Bar data={data} options={options}/>
    </div>
  );
};

export default RevenueChart;