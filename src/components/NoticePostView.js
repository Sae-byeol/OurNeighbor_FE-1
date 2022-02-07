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

  console.log(notice);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

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

  // 현재 로그인된 유저 정보 - 닉네임을 author에 저장
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
        console.log(author);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

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
        className="notice-deleteButton"
        onClick={(e) => onClickDeleteButton(e)}
      >
        | 게시글 삭제 |
      </button>
    );
  };

  // 이전글/다음글
  let a = 1;
  notices.map((noticeE) => {
    noticeE.noticeNo = a;
    if (notice.id === noticeE.id) {
      notice.noticeNo = a;
    }
    a = a + 1;
  });

  const postList =
    parseInt(notices.length) <= 5
      ? notices
      : parseInt(notice.noticeNo) === 1
      ? notices.slice(
          parseInt(notice.noticeNo) - 1,
          parseInt(notice.noticeNo) + 4
        )
      : parseInt(notice.noticeNo) === 2
      ? notices.slice(
          parseInt(notice.noticeNo) - 2,
          parseInt(notice.noticeNo) + 3
        )
      : parseInt(notice.noticeNo) === parseInt(num) - 1
      ? notices.slice(
          parseInt(notice.noticeNo) - 4,
          parseInt(notice.noticeNo) + 1
        )
      : parseInt(notice.noticeNo) === parseInt(num)
      ? notices.slice(
          parseInt(notice.noticeNo) - 5,
          parseInt(notice.noticeNo) + 0
        )
      : notices.slice(
          parseInt(notice.noticeNo) - 3,
          parseInt(notice.noticeNo) + 2
        );

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
                        <div className="postlist-date"></div>
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
                        <div className="postlist-date"></div>
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