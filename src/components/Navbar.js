import React from "react";
import "../Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navdiv">
      <ul className="nav">
        <Link to="/best" style={{ textDecoration: "none" }}>
          <li className="nav-list">추천 게시판</li>
        </Link>
        <Link to="/market" style={{ textDecoration: "none" }}>
          <li className="nav-list">중고거래</li>
        </Link>
        <Link to="/gathering" style={{ textDecoration: "none" }}>
          <li className="nav-list">모임 모집 게시판</li>
        </Link>
        <Link to="/calender" style={{ textDecoration: "none" }}>
          <li className="nav-list">캘린더/공지사항</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
