import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import gatherings from "./Gathering";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";

const BestPostView = (props) => {
  const gatherings = props.component;
  const num = gatherings.length;
  const { gatheringNo, category } = useParams();

  const matchItem = props.component.find(function (element) {
    if (
      element.gatheringNo === Number(gatheringNo) &&
      element.category === category
    )
      return true;
  });

  const categoryName = () => {
    if (matchItem.category === "exercise") return "운동";

    if (matchItem.category === "parents") return "학부모";

    if (matchItem.category === "hobby") return "취미";

    if (matchItem.category === "foodplace") return "맛집탐방";

    if (matchItem.category === "animal") return "반려동물";
  };

  const postList =
    parseInt(gatheringNo) === 1
      ? gatherings.slice(parseInt(gatheringNo) - 1, parseInt(gatheringNo) + 4)
      : parseInt(gatheringNo) === 2
      ? gatherings.slice(parseInt(gatheringNo) - 2, parseInt(gatheringNo) + 3)
      : parseInt(gatheringNo) === parseInt(num) - 1
      ? gatherings.slice(parseInt(gatheringNo) - 4, parseInt(gatheringNo) + 1)
      : parseInt(gatheringNo) === parseInt(num)
      ? gatherings.slice(parseInt(gatheringNo) - 5, parseInt(gatheringNo) + 0)
      : gatherings.slice(parseInt(gatheringNo) - 3, parseInt(gatheringNo) + 2);

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">추천게시판</span>
        </div>
        <div className="line"></div>
        <div className="bestPostView-section1">
          <span className="bestPostView-title">{matchItem.title}</span>
          <div className="bestPostView-subtitle">
            <span>{matchItem.title}</span>
            <span>/</span>
            <span>작성자: {matchItem.member_id}</span>
          </div>
          <div className="bestPostView-content">
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
        <div className="category-line"></div>
        <div className="category-name">카테고리</div>
        <div className="category">
          <span className="category-type">{categoryName()}</span>
        </div>
        <div className="relpy-line"></div>
        <div className="bestPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">오새별</div>
          <textarea className="reply-input"></textarea>
          <button className="replybtn">댓글 달기</button>
        </div>
        <div className="pagination-line"></div>
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return parseInt(item.gatheringNo) ===
                    parseInt(matchItem.gatheringNo) ? (
                    <Link
                      to={`/gatheringpostView/${item.category}/${item.gatheringNo}`}
                      style={{ textDecoration: "none", color: "#ffa800" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">{item.date}</div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/gatheringpostView/${item.category}/${item.gatheringNo}`}
                      style={{ textDecoration: "none", color: "#443333" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">{item.date}</div>
                      </div>
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestPostView;
