import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../BestForm.css";
import BestPostView from "./BestPostView";
import axios from "axios";

const BestForm = (props) => {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage();
    //console.log(props);
    if (props.best.photoIds.length !== 0) {
      axios({
        method: "GET",
        url: "/photo/" + props.best.photoIds[0],
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
    //console.log(imgs);
  }, [props.id]);

  return (
    <div>
      <Link
        to={`/bestPostView/${props.best.id}`}
        style={{ textDecoration: "none" }}
      >
        <div className="bestForm">
          <div className="bestForm-title" style={{ fontSize: "25px" }}>
            {props.best.title}
          </div>
          <div className="bestForm-date">
            {String(props.best.createdDate).substr(0, 10)}
          </div>
          <div style={{ width: "30px", height: "10px" }}></div>
          {image ? <img className="bestForm-img" src={image}></img> : null}
          {image ? (
            <div className="bestForm-cont">
              <div style={{ width: "30px", height: "10px" }}></div>
              {props.best.content.length >= 91
                ? props.best.content.substring(0, 90) + "..."
                : props.best.content.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
            </div>
          ) : (
            <div className="bestForm-cont">
              <div style={{ width: "30px", height: "80px" }}></div>
              {props.best.content.length >= 150
                ? props.best.content.substring(0, 151) + "..."
                : props.best.content}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default BestForm;
