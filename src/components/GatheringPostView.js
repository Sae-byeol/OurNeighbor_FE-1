import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import gatherings from "./Gathering";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";
import ParentComment from "./ParentComment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GatheringPostView = (props, { history }) => {
  const { id } = useParams();
  const [gathering, setGathering] = useState([]);
  const [gatherings, setGatherings] = useState([]);
  const num = gatherings.length;
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/apartments/gatherings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //console.log("success");
        setGatherings(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/gathering/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setGathering(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.nickName);
        setNickname(res.data.nickName);
        console.log(nickname);
      })
      .catch((err) => console.log(err));
  }, []);

  const showNickName = (e) => {
    if (String(nickname) === String(gathering.author)) {
      console.log(String(nickname) === String(gathering.author));
      return (
        <button
          className="gatheringPostView-button"
          onClick={(e) => onClickButton(e)}
        >
          모집완료
        </button>
      );
    }
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  const onClickButton = (e) => {
    e.preventDefault();
    alert("모집완료 처리가 되었습니다");
    axios
      .put("/gathering/" + id, { complete: true })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/gathering");
  };

  const postList =
    parseInt(gatherings.length) <= 5
      ? gatherings
      : parseInt(gathering.id) === 1
      ? gatherings.slice(parseInt(gathering.id) - 1, parseInt(gathering.id) + 4)
      : parseInt(gathering.id) === 2
      ? gatherings.slice(parseInt(gathering.id) - 2, parseInt(gathering.id) + 3)
      : parseInt(gathering.id) === parseInt(num) - 1
      ? gatherings.slice(parseInt(gathering.id) - 4, parseInt(gathering.id) + 1)
      : parseInt(gathering.id) === parseInt(num)
      ? gatherings.slice(parseInt(gathering.id) - 5, parseInt(gathering.id) + 0)
      : gatherings.slice(
          parseInt(gathering.id) - 3,
          parseInt(gathering.id) + 2
        );

  const categoryName = () => {
    if (gathering.category === "exercise") return "운동";

    if (gathering.category === "parents") return "학부모";

    if (gathering.category === "hobby") return "취미";

    if (gathering.category === "foodplace") return "맛집탐방";

    if (gathering.category === "animal") return "반려동물";
  };

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
          <span className="sub-title1">모임 모집 게시판</span>
        </div>
        <div className="line"></div>
        <div className="gatheringPostView-section1">
          <span className="gatheringPostView-title">{gathering.title}</span>
          <div className="gatheringPostView-subtitle">
            <span>{gathering.title}</span>
            <span>/</span>
            <span>작성자: {gathering.author}</span>
          </div>
          <div>{showNickName()}</div>
          <div className="gatheringPostView-content">
            {String(gathering.content)
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
        <div className="gatheringPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">{gathering.author}</div>
          <textarea
            className="reply-input"
            onChange={(e) => getValue(e.target.value)}
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
                  return item.complete === true ? (
                    <div
                      className="postlist"
                      key={index}
                      style={{ backgroundColor: "rgba(215, 215, 215, 0.7)" }}
                    >
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-complete">모집완료</div>
                      <div className="postlist-date">{item.date}</div>
                    </div>
                  ) : parseInt(item.id) === parseInt(gathering.id) ? (
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
