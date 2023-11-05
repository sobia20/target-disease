import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data, labels, type, target, styledValue }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
    }
    const newChartInstance = new Chart(ctx, {
      type: type,
      data: {
        labels,
        datasets: [
          {
            label: 'Association scores',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: `Data Type Scores: ${target} and lung carcinoma`
            }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    chartInstanceRef.current = newChartInstance;
  }, [data, labels, type, target,styledValue]);

  return (
    <div >
      <div style={styledValue}>
      <canvas ref={chartRef}/>
      </div>
    </div>
  );
};

export default BarChart;