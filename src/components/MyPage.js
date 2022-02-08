import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../Mypage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyPage = () => {
  const [user, setUser] = useState({});
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get("/member", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickResign = (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "회원 탈퇴하시겠습니까?\n모든 정보가 삭제됩니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니요",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/member/" + user.id, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "탈퇴되었습니다.",
              });
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              navigate("/");
            })
            .catch((err) => console.log(err));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "취소합니다.",
          });
        }
      });
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">마이페이지</span>
        </div>
        <div className="line"></div>
        <div className="mypage-section2">
          <div className="mypageForm">
            <img className="mypage-img" src="../img/profile.png"></img>
            <div className="mypage-content">
              <span className="mypage-content-title">이름</span>
              <span className="mypage-content-content">{user.name}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">닉네임</span>
              <span className="mypage-content-content">{user.nickName}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">아이디</span>
              <span className="mypage-content-content">{user.loginId}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">이메일</span>
              <span className="mypage-content-content">{user.email}</span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">아파트</span>
              <span className="mypage-content-content-apart">
                {user.apartName}
              </span>
            </div>
            <div className="mypage-content">
              <span className="mypage-content-title">회원 유형</span>
              <span className="mypage-content-content">{user.role}</span>
            </div>
            <div className="mypage-edit">
              <Link to={"/editMyPage"} state={{ user: user }}>
                <div className="mypage-editBtn">ㅣ회원정보 수정하기ㅣ</div>
              </Link>
            </div>
            <div className="mypage-resignBtn" onClick={(e) => onClickResign(e)}>
              ㅣ탈퇴하기ㅣ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
