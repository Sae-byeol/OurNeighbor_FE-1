import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../BestForm.css";
import BestPostView from "./BestPostView";

const BestForm = (props) => {
  return (
    <Link
      to={`/bestPostView/${props.best.bestNoCategory}`}
      style={{ textDecoration: "none" }}
    >
      <div className="bestForm">
        <div className="bestForm-title" style={{ fontSize: "25px" }}>
          {props.best.title}
        </div>
        <img className="bestForm-img" src={props.best.img}></img>
        <div className="bestForm-cont">
          {props.best.cont.length >= 71
            ? props.best.cont.substring(0, 71) + "..."
            : props.best.cont}
        </div>
        <div className="bestForm-date">{props.best.date}</div>
      </div>
    </Link>
  );
};

export default BestForm;
