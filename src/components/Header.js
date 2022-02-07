import React, { useState, useEffect } from "react";
import "../Header.css";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import axios from "axios";
const Header = (props) => {
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      localStorage.removeItem("accessToken");
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    window.location.replace("/");
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="header-left">
          <img
            className="imagelogo"
            src="../img/imagelogo.png"
            width="100"
            height="100"
          ></img>
          <img className="logo" src="../img/logo.png"></img>
        </div>
      </Link>
      {isLogin ? (
        <div className="header-right">
          <div className="header-right-left">
            <div>나의 쪽지함</div>
            <div>{user.name}</div>
            <button className="header-logout" onClick={Logout}>
              로그아웃
            </button>
          </div>
          <div className="header-right-right">
            <Link to="/mypage">
              <img className="profile" src="../img/profile.png"></img>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
