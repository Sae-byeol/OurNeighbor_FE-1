import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../BestForm.css";

const BestForm = (props) => {
  return (
    <Link
      to={{
        pathname: "/bestPostView",
        state: {
          title: "테스트",
          img: "테스트",
        },
      }}
      style={{ textDecoration: "none" }}
    >
      <div className="bestForm">
        <div className="bestForm-title" style={{ fontSize: "25px" }}>
          {props.best.title}
        </div>
        <img className="bestForm-img" src={props.best.img}></img>
        <div className="bestForm-cont">{props.best.cont}</div>
        <div className="bestForm-date">{props.best.date}</div>
      </div>
    </Link>
  );
};

export default BestForm;
