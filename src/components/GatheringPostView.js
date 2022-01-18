import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringPostView.css";
import { useHistory, useParams, Outlet } from "react-router-dom";
import gatherings from "./Gathering";

const GatheringPostView = (props) => {
  const { gatheringNo } = useParams();

  const matchItem = props.component.find(function (element) {
    if (element.gatheringNo === Number(gatheringNo)) return true;
  });

  const category = () => {
    if (matchItem.category === "exercise") return "운동";

    if (matchItem.category === "parents") return "학부모";

    if (matchItem.category === "hobby") return "취미";

    if (matchItem.category === "foodplace") return "맛집탐방";

    if (matchItem.category === "anima") return "반려동물";
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">중고거래</span>
        </div>
        <div className="line"></div>

        <div className="gatheringPostView-section1">
          <span className="gatheringPostView-title">{matchItem.title}</span>
          <span>
            <button className="gathering-complete-btn">판매 완료</button>
          </span>
          <div className="gatheringPostView-subtitle">
            <span>{matchItem.date}</span>
            <span>작성자:{matchItem.user}</span>
          </div>
          <img className="gatheringPostView-img" src="../img/test.png"></img>
          <div className="gatheringPostView-content">
            {matchItem.cont.split("\n").map((line) => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })}
          </div>
        </div>
        <div className="relpy-line"></div>
        <div className="gatheringPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">오새별</div>
          <textarea className="reply-input"></textarea>
          <button className="replybtn">댓글 달기</button>
        </div>
      </div>
    </div>
  );
};

export default GatheringPostView;
