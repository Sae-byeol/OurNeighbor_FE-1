import React, { useState, useEffect } from "react";
import axios from "axios";
import "../MarketFormComplete.css";

const MarketFormComplete = (props) => {
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
  });

  console.log(props);

  return (
    <div className="marketForm-complete">
      <div className="marketForm-complete-text">판매완료</div>
      <div className="marketForm-complete-title" style={{ fontSize: "25px" }}>
        {props.market.title}
      </div>
      <div className="marketForm-complete-date">
        {String(props.market.createdDate).substr(0, 10)}
      </div>
      <div style={{ width: "30px", height: "10px" }}></div>
      {image ? (
        <img className="marektForm-complete-img" src={image}></img>
      ) : null}
      {image ? (
        <div className="marketForm-complete-cont">
          <div style={{ width: "30px", height: "10px" }}></div>
          {props.market.content.length >= 71
            ? props.market.content.substring(0, 70) + "..."
            : props.market.content}
        </div>
      ) : (
        <div className="marketForm-complete-cont">
          <div style={{ width: "30px", height: "80px" }}></div>
          {props.market.content.length >= 150
            ? props.market.content.substring(0, 151) + "..."
            : props.market.content}
        </div>
      )}
    </div>
  );
};

export default MarketFormComplete;