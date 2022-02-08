import React, { useState, useEffect } from "react";
import "../MarketForm.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";

const MarketForm = (props) => {
  const [image, setImage] = useState();
  useEffect(() => {
    if (props.market.photoId.length !== 0) {
      axios({
        method: "GET",
        url: "/photo/" + props.market.photoId[0],
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          setImage(
            window.URL.createObjectURL(
              new Blob([res.data], { type: res.headers["content-type"] })
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(1);
  return (
    <Link
      to={`/marketPostView/${props.market.id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="marketForm">
        <div className="marketForm-title" style={{ fontSize: "25px" }}>
          {props.market.title}
        </div>
        <div className="marketForm-date">
          {String(props.market.createdDate).substr(0, 10)}
        </div>
        <div style={{ width: "30px", height: "10px" }}></div>
        {image ? <img className="marektForm-img" src={image}></img> : null}
        {image ? (
          <div className="marketForm-cont">
            <div style={{ width: "30px", height: "10px" }}></div>
            {props.market.content.length >= 71
              ? props.market.content.substring(0, 70) + "..."
              : props.market.content}
          </div>
        ) : (
          <div className="marketForm-cont">
            <div style={{ width: "30px", height: "80px" }}></div>
            {props.market.content.length >= 150
              ? props.market.content.substring(0, 151) + "..."
              : props.market.content}
          </div>
        )}
      </div>
    </Link>
  );
};

export default MarketForm;
