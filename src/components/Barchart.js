// src/components/Dashboard.js
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./barchart.css";
const Dashboard = () => {
  const salesChartRef = useRef(null);
  const purchaseChartRef = useRef(null);
  const PieChartRef = useRef(null);

  const xValues = ["Mouse","Monitor","keyborad","SSD","HHD","PC","Laptop","Router","Sound Box","Motherboard"];
  var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145"];

  useEffect(() => {
    // Initialize charts
    const salesChart = new Chart(salesChartRef.current, {
      type: "bar",
      data: salesData,
      options: {
        scales: {
          x: {
            type: "category", // Update the scale type to 'category'
            labels: labels,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // const salesPieChart = new Chart(SalePieChartRef.current, {
    //   type: "pie",
    //   data: {
    //     labels: xValues,
    //     datasets: [
    //       { labels:"Sale",
    //         backgroundColor: barColors,
    //         data: yValues,
    //       },
    //     ],
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: "World Wide Wine Production 2018",
    //     },
    //   },
    // });
    const purchaseChart = new Chart(purchaseChartRef.current, {
      type: 'bar',
      data: purchasesdata,
      options: {
        scales: {
          x: {
            type: 'category', // Update the scale type to 'category'
            labels: xValues,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    const PieChart = new Chart(PieChartRef.current, {
      type: "pie",
      data: {
        labels: Values,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "World Wide Wine Production 2018"
        }
      }
    });

    // Return a cleanup function to destroy the charts when the component unmounts
    return () => {
      salesChart.destroy();
      purchaseChart.destroy();
      PieChart.destroy()
    };
  }); // Empty dependency array ensures this effect runs only once on mount

  // Sample data for Sales and Purchases
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agust",
    "September",
    "october",
    "November",
    "December",
  ];

  const salesData = {
    labels: labels,
    datasets: [
      {
        label: "Sale",
        data: [650, 590, 800, 810, 560, 550, 400, 650, 590, 800, 810, 580, 556],
        backgroundColor: [
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
        ],
        borderColor: [
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const purchasesdata = {
    labels: xValues,
    datasets: [
      {
        label: "Quantity",
        data:[95, 90, 80, 70, 60,50, 40,30,20,10],
        backgroundColor: [
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
        ],
        borderColor: [
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
          "rgba(0, 156, 255, .7)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const yValues = [55, 49, 44, 24, 15];
  const Values = ["Laptop", "Monitor", "Router", "Mouse", "SSD"];

  

  return (
    <div>
      <div className="container_barchart">
        <div className="box_bar_chart">
          <div className="box_head">Monthly Sale Income</div>
          <canvas
            ref={salesChartRef}
            style={{ width: "500px", height: "200px" }}
          />
        </div>

        <div className="box_bar_chart">
        <div className="box_head">Most 10 Sale Product</div>
          <canvas
            ref={purchaseChartRef}
            style={{ width: "500px", height: "200px" }}
          ></canvas>
        </div>
        <div className="box_pie_chart">
        <div className="box_head">Monthly Product Base Income </div>
          <canvas
            ref={PieChartRef}
            style={{ width: "500px", height: "200px" }}
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
