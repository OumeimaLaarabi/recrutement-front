import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./ChartComponent.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Row, Col } from "antd";
import { GetMonthlyUserCount } from "../Services/UserServices";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Users",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [],
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetMonthlyUserCount();
        const labels = data.map((item) => item.month);
        const userCounts = data.map((item) => item.count);

        setBarData({
          ...barData,
          labels: labels,
          datasets: [
            {
              ...barData.datasets[0],
              data: userCounts,
            },
          ],
        });

        setLineData({
          ...lineData,
          labels: labels,
          datasets: [
            {
              ...lineData.datasets[0],
              data: userCounts, // Example data; adjust according to your API response
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <div className="chartComponent">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Number of Users">
            <Bar data={barData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Users">
            <Line data={lineData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartComponent;
