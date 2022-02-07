import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";
import "../MarketAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MarketAdd = () => {
  const [marketTitle, setMarketTitle] = useState("");
  const [marketContent, setMarketContent] = useState("");
  const navigate = useNavigate();

  const FileElement = document.querySelector("#File");
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (var key of formData.keys()) {
      console.log(key);
    }

    for (var value of formData.values()) {
      console.log(value);
    }

    formData.append("title", marketTitle);
    formData.append("content", marketContent);
    for (let i = 0; i < FileElement.files.length; i++) {
      formData.append("file", FileElement.files[i]);
    }

    if (marketTitle === "" || marketContent === "") {
      alert("제목, 내용을 모두 입력해주세요.");
    } else {
      axios
        .post("/used-goods", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert("글이 정상적으로 작성되었습니다.");
          console.log(res.data);
          if (res.data) {
            navigate("/market");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFiles([...files, { uploadedFile: file }]);
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">중고거래</span>
        </div>
        <div className="line"></div>
        <div className="marketAdd-section2">
          <form>
            <span className="marketAddTitle">제목</span>
            <input
              className="marketAddTitleInput"
              type="text"
              value={marketTitle}
              onChange={(e) => setMarketTitle(e.target.value)}
            />
            <div className="marketAddContent">세부사항</div>
            <textarea
              className="marketAddTextarea"
              type="text"
              placeholder=" 판매 용품 명
                            S / M / L / XL 등
                            유아용 / 아동용 / 청소년용 / 여성용 / 남성용 등
                            희망 판매 가격"
              value={marketContent}
              onChange={(e) => setMarketContent(e.target.value)}
            />
            <input
              type="file"
              className="imgInput"
              id="File"
              name="file"
              multiple
              encType="multipart/form-data"
              onChange={handleUpload}
            ></input>
            <button className="marketAddCompleteBtn" onClick={onSubmit}>
              작성 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MarketAdd;