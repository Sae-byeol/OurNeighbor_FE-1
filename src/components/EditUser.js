import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { useParams, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const user = useLocation().state.user;

  const id = user.loginId;
  const name = user.name;
  const nickname = user.nickName;
  const pw = user.password;
  const email = user.email;
  const apart = user.apartName;
  const role = user.role;

  const [newNickName, setNewNickName] = useState(nickname);
  const [newPw, setNewPw] = useState(pw);
  const navigate = useNavigate();

  const editUser = () => {
    axios
      .put(
        "/member",
        {
          nickName: newNickName,
          password: newPw,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        alert("회원정보가 수정되었습니다.");
        console.log(res.data);
        navigate("/mypage");
      });
  };
  const changeNickName = useCallback((e) => {
    setNewNickName(e.target.value);
  }, []);
  const changePw = useCallback((e) => {
    setNewPw(e.target.value);
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">회원정보 수정</span>
        </div>
        <div className="line"></div>
        <div className="mypage-section2">
          <div className="editForm">
            <img className="mypage-img" src="../img/profile.png"></img>
            <div className="mypage-content">
              <span className="mypage-content-title">이름</span>
              <span className="edit-mypage-content">{name}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">닉네임</span>
              <input
                className="edit-user"
                placeholder="원하는 닉네임을 입력하세요"
                onChange={changeNickName}
              ></input>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">아이디</span>
              <span className="edit-mypage-content">{id}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">비밀번호</span>
              <input
                className="edit-user"
                placeholder="원하는 비밀번호를 입력하세요"
                onChange={changePw}
              ></input>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">아파트</span>
              <span className="edit-mypage-content">{apart}</span>
            </div>

            <div className="mypage-edit">
              <div className="editpage-editBtn" onClick={editUser}>
                ㅣ수정 내용 저장하기ㅣ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
