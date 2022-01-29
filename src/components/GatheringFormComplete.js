import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../GatheringFormComplete.css";

const GatheringForm = (props) => {
  return (
    <div className="gatheringForm-complete">
      <div className="gatheringForm-complete-text">모집완료</div>
      <div
        className="gatheringForm-complete-title"
        style={{ fontSize: "25px" }}
      >
        {props.gathering.title}
      </div>
      <div className="gatheringForm-complete-cont">{props.gathering.cont}</div>
      <div className="gatheringForm-complete-date">{props.gathering.date}</div>
    </div>
  );
};

export default GatheringForm;
