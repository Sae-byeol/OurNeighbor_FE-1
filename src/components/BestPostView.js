import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../BestPostView.css";

import { useHistory, useParams, Outlet } from "react-router-dom";
import bests from "./Best";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";
import ParentComment from "./ParentComment";
import axios from "axios";

const BestPostView = () => {
  const { id } = useParams();
  const [getBest, setGetBest] = useState([]);

  axios
    .get("/recommend-posts/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      setGetBest(res.data);
      console.log(res.data);
      console.log(getBest);
    })
    .catch((err) => console.log(err));

  const bests = getBest;
  const num = bests.length;

  const categoryName = () => {
    if (bests.category === "food") return "맛집";

    if (bests.category === "academy") return "학원";

    if (bests.category === "cafe") return "카페";

    if (bests.category === "sports") return "운동시설";
  };

  const postList =
    parseInt(bests.id) === 1
      ? bests.slice(parseInt(bests.id) - 1, parseInt(bests.id) + 4)
      : parseInt(bests.id) === 2
      ? bests.slice(parseInt(bests.id) - 2, parseInt(bests.id) + 3)
      : parseInt(bests.id) === parseInt(num) - 1
      ? bests.slice(parseInt(bests.id) - 4, parseInt(bests.id) + 1)
      : parseInt(bests.id) === parseInt(num)
      ? bests.slice(parseInt(bests.id) - 5, parseInt(bests.id) + 0)
      : bests.slice(parseInt(bests.id) - 3, parseInt(bests.id) + 2);

  // 대댓글 구현
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
          <span className="bestPostView-title">{bests.title}</span>
          <div className="bestPostView-subtitle">
            <span>{bests.title}</span>
            <span>/</span>
            <span>작성자: {bests.author}</span>
          </div>
          <img className="bestPostView-img" src={bests.photold}></img>
          <div className="bestPostView-content">
            {bests.content.split("\n").map((line) => {
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
                  return parseInt(item.id) === parseInt(bests.id) ? (
                    <Link
                      to={`/bestPostView/${item.id}`}
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
                      to={`/bestPostView/${item.id}`}
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
