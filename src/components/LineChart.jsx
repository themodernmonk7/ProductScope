import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({stocks, productTitle}) => {

    const data = {
        labels: productTitle,
        datasets: [{
            label: 'Stock',
            data: stocks,
            backgroundColor: 'aqua',
            borderColor: 'black',
            pointBorderColor: 'aqua',
        }]
    }

    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Total Product Stocks',
          },
        },
      };
    
  return (
    <>
    <section className=" w-full md:w-2/3  ">
        <Line data={data} options={options} > </Line>
    </section>
    </>
  )
}

export default LineChart