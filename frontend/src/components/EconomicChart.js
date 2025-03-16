// frontend/src/components/EconomicChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const EconomicChart = () => {
  // Initialize with an empty structure
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch forex data from our backend endpoint
    fetch('/api/economic/forex')
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is an array; if not, log an error and stop.
        if (!Array.isArray(data)) {
          console.error("Fetched data is not an array:", data);
          setLoading(false);
          return;
        }

        // We expect data to be an array of objects like:
        // [{ currency: 'EUR', rate: 0.85, date: '2021-09-01' }, ...]
        // We want to create a chart showing rates for selected currencies.
        const currencies = ['EUR', 'GBP', 'JPY'];

        // For each selected currency, find its data and create a dataset.
        const filteredData = currencies.map((cur) => {
          const currencyData = data.find((item) => item.currency === cur);
          return {
            label: cur,
            // Since we only have one snapshot, we use a single data point.
            data: [currencyData ? currencyData.rate : 0],
            fill: false,
            borderColor: cur === 'EUR' ? 'blue' : cur === 'GBP' ? 'green' : 'red',
          };
        });

        // Use the date from the first item (if available) as the label.
        const labels = data.length > 0 ? [data[0].date] : [];

        setChartData({
          labels: labels,
          datasets: filteredData,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching chart data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h3>Forex Data Chart</h3>
      {loading ? (
        <p>Loading chart data...</p>
      ) : chartData.labels.length > 0 && chartData.datasets.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No chart data available</p>
      )}
    </div>
  );
};

export default EconomicChart;
