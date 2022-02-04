import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../GatheringForm.css";

const GatheringForm = (props) => {
  return (
    <Link
      to={`/gatheringPostView/${props.gathering.id}`}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <div className="gatheringForm">
        <div className="gatheringForm-title" style={{ fontSize: "25px" }}>
          {props.gathering.title}
        </div>
        <div className="gatheringForm-cont">{props.gathering.cont}</div>
        <div className="gatheringForm-date">{props.gathering.date}</div>
      </div>
    </Link>
  );
};

export default GatheringForm;
