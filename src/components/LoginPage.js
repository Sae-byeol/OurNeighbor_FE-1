import React, { useState } from "react";
import "../LoginPage.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState("noAccess");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/login", {
        loginId: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        //axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`
        console.log(res.data.accessToken);
        if (res.data) {
          setAccess("access");
        }
      });
  };
  

  //console.log(access);

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
