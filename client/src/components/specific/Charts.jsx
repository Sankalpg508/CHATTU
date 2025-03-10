import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  CategoryScale, Chart as ChartJS, Tooltip, Filler, LinearScale, ArcElement, Legend, 
  PointElement, LineElement, Title 
} from 'chart.js';
import { getLast7Days } from '../../lib/features';
import { orange, purple, purpleLight } from '../../constants/color';
import moment from 'moment';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, ArcElement, Legend
);
const labels = getLast7Days();

const LineCharts = ({value=[]}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'User1',
        data: value,
        borderColor: 'rgba(75,192,192,0.2)',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'User2',
        data: value,
        borderColor: 'rgba(75,12,192,0.3)',
        backgroundColor: 'rgba(75,12,192,1)',
        fill: false,
      },
      {
        label: 'User3',
        data: value,
        borderColor: 'rgba(75,192,12,0.2)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Monthly Messages Data' },
    },
  };

  return <Line data={data} options={options} />;
};
const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: { display: true },
        title: { display: true, text: 'Total Chats VS Group Chats' },
    },
    };
const DoughnutCharts = ({value =[], labels = []}) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Chats VS Group Chats',
        data: value,
        backgroundColor: [purpleLight, orange],
        hoverBackgroundColor: [purple, orange],
      },
    ],
  };

  return <Doughnut data={data} options={doughnutChartOptions} />;
};

export { LineCharts, DoughnutCharts };
