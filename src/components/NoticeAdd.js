import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import "../MarketAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NoticeAdd = () => {
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    //add함수 props로 받아오기
    if (noticeTitle === "" || noticeContent === "") {
      Swal.fire({
        icon: "warning",
        title: "제목, 내용을 모두 입력해주세요.",
      });
    } else {
      axios
        .post(
          "/notices",
          {
            title: noticeTitle,
            content: noticeContent,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "글이 정상적으로 작성되었습니다.",
          });
          if (res.data) {
            navigate("/notice");
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
        <div className="marketAdd-section2">
          <form>
            <span className="marketAddTitle">제목</span>
            <input
              className="marketAddTitleInput"
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
            />
            <div className="marketAddContent">내용</div>
            <textarea
              className="marketAddTextarea"
              type="text"
              placeholder=" 내용"
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
            />
            <button className="marketAddCompleteBtn" onClick={onSubmit}>
              작성 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoticeAdd;