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

const BestPostView = (props) => {
  const { id } = useParams();
  const [best, setBest] = useState([]);
  const [bests, setBests] = useState([]);
  const num = bests.length;

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/apartments/recommend-posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //console.log("success");
        setBests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/recommend-posts/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBest(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  const postList =
    parseInt(best.id) <= 5
      ? bests
      : parseInt(best.id) === 1
      ? bests.slice(parseInt(best.id) - 1, parseInt(best.id) + 4)
      : parseInt(best.id) === 2
      ? bests.slice(parseInt(best.id) - 2, parseInt(best.id) + 3)
      : parseInt(best.id) === parseInt(num) - 1
      ? bests.slice(parseInt(best.id) - 4, parseInt(best.id) + 1)
      : parseInt(best.id) === parseInt(num)
      ? bests.slice(parseInt(best.id) - 5, parseInt(best.id) + 0)
      : bests.slice(parseInt(best.id) - 3, parseInt(best.id) + 2);

  const categoryName = () => {
    if (best.category === "food") return "맛집";

    if (best.category === "academy") return "학원";

    if (best.category === "cafe") return "카페";

    if (best.category === "sports") return "운동시설";
  };

  // 대댓글 구현
  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState(0);
  const [responseTo, setResponseTo] = useState(0);

  const getValue = (e) => {
    setCommentContents(e.target.value);
    console.log(responseTo);
  };

  const forAddComment = () => {
    setCommentId(commentId + 1);
    setResponseTo(responseTo + 1);
  };

  const addComment = (e) => {
    renumberResponseTo();
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }

    setCommentId(commentId + 1);
    setResponseTo(responseTo + 1);
    let body = {
      content: commentContents,
      commentId: commentId,
      responseTo: responseTo,
    };

    setCommentList(commentList.concat(body));

    setCommentContents("");
    axios
      .post(
        "/comment/" + id,
        {
          postCategory: "recommend",
          content: commentContents,
          responseTo: responseTo,
          commentType: "parent",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const renumberResponseTo = () => {
    let commentListLength = commentList.length;
    if (commentList.length !== 0) {
      console.log(Number(commentList[commentListLength - 1].responseTo) + 1);
      setResponseTo(Number(commentList[commentListLength - 1].responseTo) + 1);
      console.log(responseTo);
    }
  };

  const beforeShowComments = commentList.filter((comment) => {
    return comment.commentType === "parent";
  });

  const showComments =
    commentList === []
      ? null
      : commentList.map((parentComment, index) => {
          return (
            <ParentComment
              parentComment={parentComment}
              commentList={commentList}
              setCommentList={setCommentList}
              id={id}
              index={index}
            ></ParentComment>
          );
        });

  const deleteList = () => {
    setCommentList([]);
  };

  useEffect((e) => {
    renumberResponseTo();
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/recommend-posts/comments/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        deleteList();
        console.log(commentList);
        if (commentList.length === 0) {
          setCommentList(commentList.concat(res.data));
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
          <span className="bestPostView-title">{best.title}</span>
          <div className="bestPostView-subtitle">
            <span>{bests.title}</span>
            <span>/</span>
            <span>작성자: {best.author}</span>
          </div>
          <img className="bestPostView-img" src={best.photold}></img>
          <div className="bestPostView-content">
            {String(best.content)
              .split("\n")
              .map((line) => {
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
          <div className="reply-id">{best.author}</div>
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
                  return parseInt(item.id) === parseInt(best.id) ? (
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
