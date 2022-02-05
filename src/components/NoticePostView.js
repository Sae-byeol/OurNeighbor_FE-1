import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory, useParams, Outlet } from "react-router-dom";
import "../NoticePostView.css";
import ParentComment from "./ParentComment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoticePostView = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState([]);
  const [notices, setNotices] = useState([]);
  const num = notices.length;
  const navigate = useNavigate();

  // 전체 게시글 정보를 불러와서 notices에 저장
  useEffect(() => {
    axios
      .get("/apartments/notices", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setNotices(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 해당 게시글 정보를 불러와서 notice에 저장
  // 여기서 useParams()는 무슨 역할?
  useEffect(() => {
    axios
      .get("/notices/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 삭제 버튼 누를 때 실행
  const onClickDeleteButton = (e) => {
    e.preventDefault();
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete("/notices/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          navigate("/notice");
        })
        .catch((err) => console.log(err));
    } else {
      alert("취소합니다.");
    }
  };

  // 게시글 삭제 버튼 보여주는 코드
  const showDeleteButton = (e) => {
    return (
      <button
        className="market-deleteButton"
        onClick={(e) => onClickDeleteButton(e)}
      >
        | 게시글 삭제 |
      </button>
    );
  };

  const postList =
    parseInt(notices.length) <= 5
      ? notices
      : parseInt(id) === 1
      ? notices.slice(parseInt(notice.id) - 1, parseInt(notice.id) + 4)
      : parseInt(notice.id) === 2
      ? notices.slice(parseInt(notice.id) - 2, parseInt(notice.id) + 3)
      : parseInt(notice.id) === parseInt(num) - 1
      ? notices.slice(parseInt(notice.id) - 4, parseInt(notice.id) + 1)
      : parseInt(notice.id) === parseInt(num)
      ? notices.slice(parseInt(notice.id) - 5, parseInt(notice.id) + 0)
      : notices.slice(parseInt(notice.id) - 3, parseInt(notice.id) + 2);

  // <대댓글 구현>
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
          <Link to="/notice" style={{ textDecoration: "none" }}>
            <span className="sub-title1">공지사항</span>
          </Link>
        </div>
        <div className="line"></div>
        <div className="noticePostView-section1">
          <div>{showDeleteButton()}</div>
          <span className="noticePostView-title">{notice.title}</span>
          <div className="noticePostView-subtitle">
            <span>{notice.date}</span>
          </div>
          <div className="noticePostView-content">
            {String(notice.content)
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
        <div className="relpy-line"></div>
        <div className="noticePostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">{notice.member_id}</div>
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
        <div className="pagination-section">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return parseInt(item.id) === parseInt(notice.id) ? (
                    <Link
                      to={`/noticePostView/${item.id}`}
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
                      to={`/noticePostView/${item.id}`}
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

export default NoticePostView;
