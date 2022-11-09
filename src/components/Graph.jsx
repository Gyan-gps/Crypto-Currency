import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { CircularProgress, Container, makeStyles } from "@material-ui/core";

Chartjs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const useStyles = makeStyles(() => ({
  container: {
    width: "75%",
    marginTop: 25,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
}));

const Graph = ({ id }) => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=30`
    );
    console.log(data);
    setGraphData(data.prices);
    setLoading(false);
  };

  const classes = useStyles();
  useEffect(() => {
    console.log("works");
    getData();
  }, []);

  return (
    <div className={classes.container}>
      {!loading ? (
        <Line
          data={{
            labels: graphData.map((i) => {
              let date = new Date(i[0]);
              return date.toLocaleDateString();
            }),
            datasets: [
              {
                data: graphData.map((i) => i[1]),
                label: "Prices",
                borderColor: "gold",
              },
            ],
          }}
        />
      ) : (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      )}
    </div>
  );
};

export default Graph;
