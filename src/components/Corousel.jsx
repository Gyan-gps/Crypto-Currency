import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  cor: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  items: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Corousel = () => {
  const [tenCoin, setTenCoin] = useState([]);

  const navigate = useNavigate();

  const callAPI = async () => {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=10"
    );
    setTenCoin(data);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const classes = useStyles();
  const items = tenCoin?.map((coin) => {
    return (
      <div className={classes.items}>
        <img
          src={coin?.image}
          height="80"
          style={{
            marginBottom: 10,
          }}
          alt={coin.symbol}
          onClick={() => navigate(`/coin/${coin.id}`)}
        />
        <span style={{ textTransform: "uppercase", fontSize: 18 }}>
          {coin.symbol}
        </span>
        <span
          style={{
            color: coin.market_cap_change_percentage_24h > 0 ? "green" : "red",
          }}
        >
          {coin.market_cap_change_percentage_24h}
        </span>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className={classes.cor}>
      <AliceCarousel
        mouseTracking
        infinite
        responsive={responsive}
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Corousel;
