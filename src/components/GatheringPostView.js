import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import gatherings from "./Gathering";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";

const GatheringPostView = (props, { history }) => {
  const gatherings = props.component;
  const num = gatherings.length;
  const { id } = useParams();

  const matchItem = props.component.find(function (element) {
    if (parseInt(element.id) === parseInt(id)) return true;
  });

  const categoryName = () => {
    if (matchItem.category === "exercise") return "운동";

    if (matchItem.category === "parents") return "학부모";

    if (matchItem.category === "hobby") return "취미";

    if (matchItem.category === "foodplace") return "맛집탐방";

    if (matchItem.category === "animal") return "반려동물";
  };

  const postList =
    parseInt(matchItem.id) === 1
      ? gatherings.slice(parseInt(matchItem.id) - 1, parseInt(matchItem.id) + 4)
      : parseInt(matchItem.id) === 2
      ? gatherings.slice(parseInt(matchItem.id) - 2, parseInt(matchItem.id) + 3)
      : parseInt(matchItem.id) === parseInt(num) - 1
      ? gatherings.slice(parseInt(matchItem.id) - 4, parseInt(matchItem.id) + 1)
      : parseInt(matchItem.id) === parseInt(num)
      ? gatherings.slice(parseInt(matchItem.id) - 5, parseInt(matchItem.id) + 0)
      : gatherings.slice(
          parseInt(matchItem.id) - 3,
          parseInt(matchItem.id) + 2
        );

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

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">모임 모집 게시판</span>
        </div>
        <div className="line"></div>
        <div className="gatheringPostView-section1">
          <span className="gatheringPostView-title">{matchItem.title}</span>
          <div className="gatheringPostView-subtitle">
            <span>{matchItem.title}</span>
            <span>/</span>
            <span>작성자: {matchItem.author}</span>
          </div>
          <div className="gatheringPostView-content">
            {matchItem.content.split("\n").map((line) => {
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
        <div className="gatheringPostView-section2">
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
                  return item.complete === "false" ? (
                    <div
                      className="postlist"
                      key={index}
                      style={{ backgroundColor: "rgba(215, 215, 215, 0.7)" }}
                    >
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-complete">모집완료</div>
                      <div className="postlist-date">{item.date}</div>
                    </div>
                  ) : parseInt(item.id) === parseInt(matchItem.id) ? (
                    <Link
                      to={`/gatheringPostView/${item.id}`}
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
                      to={`/gatheringPostView/${item.id}`}
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

export default GatheringPostView;
