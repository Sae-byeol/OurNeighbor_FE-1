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
import ChildComponent from "./ChildComponent";

const BestPostView = () => {
  const { id } = useParams();
  const [best, setBest] = useState([]);
  const [bests, setBests] = useState([]);
  const num = bests.length;

  // 전체 게시글 정보를 불러와서 bests에 저장
  useEffect(() => {
    axios
      .get("/apartments/recommend-posts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setBests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 해당 게시글 정보를 불러와서 best에 저장
  // 여기서 useParams()는 무슨 역할?
  useEffect(() => {
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

  // 이전글/다음글
  const postList =
    parseInt(bests.length) <= 5
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

  // 카테고리 이름 보여주는 함수
  const categoryName = () => {
    if (best.category === "food") return "맛집";

    if (best.category === "academy") return "학원";

    if (best.category === "cafe") return "카페";

    if (best.category === "sports") return "운동시설";
  };

  // <대댓글 구현>
  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [responseTo, setResponseTo] = useState(0);
  const commentPageType = "recommend";

  // 댓글, 대댓글 get 해오기
  useEffect((e) => {
    axios
      .get("/recommend-posts/comments/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setCommentList([]);
        if (commentList.length === 0) {
          setCommentList(commentList.concat(res.data));
          console.log("then commentList: ", commentList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("bodycommentList: ", commentList);

  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setAuthor(res.data.nickName);
      })
      .catch((err) => console.log(err));
  }, []);

  // 댓글들 보여주기
  const beforeShowComments = commentList.filter((comment) => {
    return comment.commentType === "parent";
  });

  const showComments = beforeShowComments.map((parentComment, index) => {
    const childComments = commentList.filter((comment) => {
      return (
        comment.commentType === "child" &&
        Number(index) === Number(comment.responseTo)
      );
    });
    return (
      <div>
        {String(parentComment.content).length > 50 ? (
          <div>
            <div className="reply-comment">
              <div className="reply-polygon">
                <img src={"../img/polygon.png"} alt="polygon"></img>
              </div>
              <div className="reply-eachcomment">
                <span>
                  {parentComment.content.split("\n").map((line) => {
                    return (
                      <span>
                        {line}
                        <br />
                      </span>
                    );
                  })}
                </span>
              </div>
            </div>
            <span className="reply-id">
              &nbsp;&nbsp;{parentComment.userNickName}
            </span>
          </div>
        ) : (
          <div>
            <div className="reply-comment">
              <div className="reply-polygon">
                <img src={"../img/polygon.png"} alt="polygon"></img>
              </div>
              <span className="reply-eachcomment">
                <span>{parentComment.content}</span>
              </span>
              <span className="reply-id">
                &nbsp;&nbsp;{parentComment.userNickName}
              </span>
            </div>
          </div>
        )}
        <ChildComponent
          childComments={childComments}
          commentList={commentList}
          setCommentList={setCommentList}
          id={id}
          index={index}
          author={author}
          commentPageType={commentPageType}
        ></ChildComponent>
      </div>
    );
  });

  // 댓글 작성 => commentContents에 저장

  const getValue = (e) => {
    setCommentContents(e.target.value);
  };

  // 댓글 작성 버튼 누를 때
  const addComment = (e) => {
    e.preventDefault();
    // 댓글 없으면 alert 띄우기
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }
    let body = {
      content: commentContents,
      commentType: "parent",
      userNickName: author,
    };
    setCommentList(commentList.concat(body));
    setCommentContents("");
    axios
      .post(
        "/comment/" + id,
        {
          postCategory: commentPageType,
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

  function refreshPage(e) {
    e.preventDefault();
    window.location.reload();
  }

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
          <div onClick={(e) => refreshPage(e)}>새로고침하기</div>
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
