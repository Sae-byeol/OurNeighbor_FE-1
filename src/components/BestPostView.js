import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../BestPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import bests from "./Best";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";

const BestPostView = (props) => {
  const bests = props.component;
  const num = bests.length;
  const { bestNoCategory } = useParams();

  const matchItem = bests.find(function (element) {
    if (element.bestNoCategory === bestNoCategory) return true;
  });

  const categoryName = () => {
    if (matchItem.category === "food") return "맛집";

    if (matchItem.category === "academy") return "학원";

    if (matchItem.category === "cafe") return "카페";

    if (matchItem.category === "sports") return "운동시설";
  };

  const [value, setValue] = useState("");
  const [commentList, setCommentList] = useState([]);

  const getValue = (e) => {
    setValue(e);
  };

  const addComment = () => {
    console.log("AddComment");
    setCommentList(commentList.concat([value]));
    setValue("");
  };

  const postList =
    parseInt(matchItem.constBestNo) === 1
      ? bests.slice(
          parseInt(matchItem.constBestNo) - 1,
          parseInt(matchItem.constBestNo) + 4
        )
      : parseInt(matchItem.constBestNo) === 2
      ? bests.slice(
          parseInt(matchItem.constBestNo) - 2,
          parseInt(matchItem.constBestNo) + 3
        )
      : parseInt(matchItem.constBestNo) === parseInt(num) - 1
      ? bests.slice(
          parseInt(matchItem.constBestNo) - 4,
          parseInt(matchItem.constBestNo) + 1
        )
      : parseInt(matchItem.constBestNo) === parseInt(num)
      ? bests.slice(
          parseInt(matchItem.constBestNo) - 5,
          parseInt(matchItem.constBestNo) + 0
        )
      : bests.slice(
          parseInt(matchItem.constBestNo) - 3,
          parseInt(matchItem.constBestNo) + 2
        );

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
          <img className="bestPostView-img" src={matchItem.img}></img>
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
          <textarea
            className="reply-input"
            onChange={(e) => getValue(e.target.value)}
            type="text"
            value={value}
          ></textarea>
          <div className="outreplybtn">
            <button className="replybtn" onClick={addComment}>
              댓글 달기
            </button>
          </div>
          <div>
            {commentList.map((comment) =>
              comment.length > 50 ? (
                <div>
                  <div className="reply-comment">
                    <div className="reply-polygon">
                      <img src={"../img/polygon.png"} alt="polygon"></img>
                    </div>
                    <div className="reply-eachcomment">
                      <span>{comment}</span>
                    </div>
                  </div>
                  <span className="reply-id">&nbsp;&nbsp;reply-id</span>
                </div>
              ) : (
                <div className="reply-comment">
                  <div className="reply-polygon">
                    <img src={"../img/polygon.png"} alt="polygon"></img>
                  </div>
                  <span className="reply-eachcomment">
                    <span>{comment}</span>
                  </span>
                  <span className="reply-id">&nbsp;&nbsp;reply-id</span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="pagination-line"></div>
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return parseInt(item.bestNoCategory) ===
                    parseInt(matchItem.bestNoCategory) ? (
                    <Link
                      to={`/bestPostView/${item.bestNoCategory}`}
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
                      to={`/bestPostView/${item.bestNoCategory}`}
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
