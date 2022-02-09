import React, { useState } from "react";
import "../LoginPage.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/login", {
        loginId: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        //20분뒤 로그인 연장
        setInterval(onSilentRefresh, 1200000);
        console.log(res.data.accessToken);
        if (res.data.accessToken) {
          navigate("/");
        }
      })
      .catch((Error) => {
        Swal.fire({
          icon: "warning",
          title: "일치하는 회원 정보가 없습니다.",
        });
      });
  };
  const onSilentRefresh = () => {
    console.log("refresh start");
    axios
      .post("/reissue", {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(response.data);
        console.log("refresh");
        //로그인 정상 연장 후 다시 20분 뒤 연장
        setTimeout(onSilentRefresh, 1200000);
      })
      .catch((error) => {
        // ... 로그인 실패 처리
      });
  };

  return (
    <div
      className="loginPage"
      style={{ backgroundImage: "url(/img/sign-background.png)" }}
    >
      <form className="loginpage-form">
        <div className="loginpage-image">
          <img src="/img/imagelogo.png" width="230px" height="230px"></img>
        </div>
        <div className="loginpage-image-text">
          <img src="/img/logo.png" width="305px" height="75px"></img>
        </div>
        <div>
          <input
            className="loginpage-input-id"
            name="id"
            type="text"
            placeholder="아이디"
            value={email}
            onChange={onEmailHandler}
            required
          />
        </div>
        <div>
          <input
            className="loginpage-input-pw"
            name="pw"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
            required
          />
        </div>
        <div>
          <button type="submit" onClick={onSubmit} className="loginpage-button">
            | 로그인 |
          </button>

          <span class="loginpage-q">아직 회원가입을 안 하셨나요?</span>
          <Link
            to={"/signup"}
            style={{ textDecoration: "none" }}
            className="signup-link"
          >
            | 회원가입 |
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
