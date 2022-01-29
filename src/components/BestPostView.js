import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../BestPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import bests from "./Best";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";
import ParentComment from "./ParentComment";

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

  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [count, setCount] = useState(0);

  const getValue = (e) => {
    setCommentContents(e.target.value);
  };

  let body = {
    comment: commentContents,
    index: count,
    responseTo: null,
  };

  const addComment = (e) => {
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }
    e.preventDefault();

    setCount(count + 1);
    setCommentList(commentList.concat(body));
    setCommentContents("");
  };

  const beforeShowComments = commentList.filter((comment) => {
    return comment.responseTo === null;
  });

  const showComments = beforeShowComments.map((parentComment, index) => {
    return (
      <ParentComment
        parentComment={parentComment}
        index={index}
        commentList={commentList}
        setCommentList={setCommentList}
      ></ParentComment>
    );
  });

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
            onChange={(e) => getValue(e)}
            type="text"
            value={commentContents}
          ></textarea>
          <div className="outreplybtn">
            <button className="replybtn" onClick={(e) => addComment(e)}>
              댓글 달기
            </button>
          </div>
          <div>{showComments}</div>
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
