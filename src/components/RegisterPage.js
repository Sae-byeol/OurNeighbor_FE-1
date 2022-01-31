import React, { useState } from "react";
import "../RegisterPage.css";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import axios from "axios";
// 주소창 api
// https://www.npmjs.com/package/react-daum-postcode

function RegisterPage(props) {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };

  const checkDuplication = () => {
    axios
      .get(`/member/${id}`)
      .then((res) => {
        if (res.data === "present") {
          alert("중복되는 아이디입니다.");
        } else if (res.data === "not present") {
          alert("사용가능한 아이디입니다.");
        }
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const confirmPasswordText =
    password.length === 0
      ? "입력해주세요!"
      : password === confirmPassword
      ? "비밀번호 일치"
      : "비밀번호 불일치";

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      name === "" ||
      nickname === "" ||
      id === "" ||
      password === "" ||
      confirmPassword === "" ||
      email === "" ||
      role === ""
    ) {
      alert("정보를 모두 입력해주세요");
    } else {
      axios
        .post("/signup", {
          name: name,
          email: email,
          password: password,
          loginId: id,
          nickName: nickname,
          apartName: isAddress,
          roles: role,
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [isAddress, setIsAddress] = useState("");
  return (
    <div
      class="registerPage"
      style={{ backgroundImage: "url(/img/sign-background.png)" }}
    >
      <form className="loginpage-form">
        <div>
          <img
            className="register-image"
            src="/img/imagelogo.png"
            width="80px"
            height="80px"
          ></img>
        </div>
        <div>
          <img className="register-image-text" src="/img/welcome.png"></img>
        </div>

        <div className="registerpage-names">
          <span className="span">이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            name="name"
            type="text"
            value={name}
            onChange={onNameHandler}
            required
            className="registerpage-name"
          />
        </div>
        <div className="registerpage-nicknames">
          <span className="span">닉네임&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            name="nickname"
            type="text"
            value={nickname}
            onChange={onNicknameHandler}
            required
            className="registerpage-nickname"
          />
        </div>
        <div className="registerpage-ids">
          <span className="span">아이디&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            name="id"
            type="text"
            value={id}
            onChange={onIdHandler}
            required
            className="registerpage-id"
          />
          <button
            className="registerpage-button-id"
            type="button"
            onClick={checkDuplication}
          >
            중복 확인
          </button>
        </div>
        <div className="registerpage-pws">
          <span className="span">비밀번호&nbsp;&nbsp;&nbsp;</span>
          <input
            name="pw"
            type="password"
            value={password}
            onChange={onPasswordHandler}
            required
            className="registerpage-pw"
          />
        </div>
        <div className="registerpage-confirmPws">
          <span className="span">비밀번호 확인</span>
          <input
            name="confirmPw"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            required
            className="registerpage-confirmPw"
          />
          <span className="span-right">{confirmPasswordText}</span>
        </div>
        <div className="registerpage-emails">
          <span className="span">이메일&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={onEmailHandler}
            required
            className="registerpage-email"
          />
        </div>
        <div className="registerpage-apartments">
          <span className="span">아파트&nbsp;</span>
          <button
            className="registerpage-button-apartment"
            type="button"
            onClick={openPostCode}
          >
            아파트 찾기
          </button>

          <div id="popupDom">
            {isPopupOpen && (
              <PopupDom>
                <PopupPostCode
                  onClose={closePostCode}
                  setAddress={setIsAddress}
                />
              </PopupDom>
            )}
          </div>
          <div className="registerpage-addressname">{isAddress}</div>
        </div>
        <div className="registerpage-button-radio">
          <span className="span">회원 유형&nbsp;&nbsp;</span>
          <div className="registerpage-radios">
            <div className="registerpage-radio">
              <input
                required
                id="citizen"
                value="user"
                name="member"
                type="radio"
                onClick={() => {
                  setRole("user");
                }}
              />
              주민
            </div>
            <div className="registerpage-radio">
              <input
                required
                id="admin"
                value="admin"
                name="member"
                type="radio"
                onClick={() => {
                  setRole("admin");
                }}
              />
              관리사무소
            </div>
          </div>
        </div>
        <div className="registerpage-signupbuttons">
          <button
            type="submit"
            onClick={onSubmit}
            className="registerpage-signupbutton"
          >
            | 회원가입 하기 |
          </button>
        </div>
      </form>
    </div>
  );
}
export default RegisterPage;
