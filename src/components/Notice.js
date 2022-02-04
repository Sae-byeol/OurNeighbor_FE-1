import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import axios from "axios";
import Pagination from "react-js-pagination";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../Gathering.css";
import "../GatheringForm.css";
import "../Notice.css";
const Notice = () => {
  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => console.log(err));

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.accessToken}`;
    axios
      .get("/apartments/notices")
      .then((res) => {
        console.log(res.data);
        setNotices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addNoticeVisible = () => {
    if (role === "관리자") {
      window.location.href = "/noticeAdd";
    } else {
      alert("관리자만 공지사항 추가가 가능합니다.");
    }
  };

  const getNotice = notices.reverse();
  const onClicksetPage = getNotice.filter((notice) => {
    return (page - 1) * 7 + 1 <= notice.id && notice.id <= (page - 1) * 7 + 7;
  });

  const renderNotices = onClicksetPage.map((notice) => {
    return (
      <div className="gathering-flex">
        <Link
          to={`/noticePostView/${notice.id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <div className="gatheringForm">
            <div className="gatheringForm-title" style={{ fontSize: "25px" }}>
              {notice.title}
            </div>
            <div className="gatheringForm-cont" style={{ fontSize: "20px" }}>
              {notice.content}
            </div>
            <div className="gatheringForm-date">{notice.date}</div>
          </div>
        </Link>
      </div>
    );
  });
  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>

        <div className="section1">
          <Link to="/calender" style={{ textDecoration: "none" }}>
            <span className="sub-title1">캘린더</span>
          </Link>
          <Link to="/notice" style={{ textDecoration: "none" }}>
            <span className="sub-title2">공지사항</span>
          </Link>
        </div>
        <div className="line"></div>
        <div className="notice-add-btn-div">
          <button className="notice-add-btn" onClick={addNoticeVisible}>
            글 쓰기
          </button>
        </div>

        <div className="gathering-section2">{renderNotices}</div>
      </div>
      <div>
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={
            parseInt(notices.length % 7) === 0
              ? parseInt(notices.length / 7) * 5
              : (parseInt(notices.length / 7) + 1) * 5
          }
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Notice;
