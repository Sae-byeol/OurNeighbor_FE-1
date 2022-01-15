import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../BestPostView.css";
import ListGroup from "react-bootstrap/ListGroup";

const BestPostView = () => {
  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">추천게시판</span>
        </div>
        <div className="line"></div>
        <div className="bestPostView-section1">
          <span className="bestPostView-title">제목</span>
          <div className="bestPostView-subtitle">
            <span>2021.10.31</span>
            <span>/</span>
            <span>작성자: 오새별</span>
          </div>
          <img
            className="bestPostView-img"
            src="../img/best-test-img-food.png"
          ></img>
          <div className="bestPostView-content">
            오늘은 친구들과 함께<br></br>
            당고집을 갔어요!<br></br>
            가봤는데 당고가 비주얼이 너무 좋아서<br></br>
            1차 기쁨!!<br></br>한 입 먹었는데 맛도 너무 좋아서<br></br>
            2차 기쁨!<br></br>
            특히 저는 저 녹차 당고랑 팥 당고가 아주 맘에 들었어요~~<br></br>
            달달하고 쫄깃하니 엄청 맛있으니까 꼭! 가서 드셔보세요!<br></br>
          </div>
        </div>
        <div className="category-line"></div>
        <div className="category-name">카테고리</div>
        <div className="category">
          <span className="category-type">맛집</span>
        </div>
        <div className="relpy-line"></div>
        <div className="bestPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">오새별</div>
          <textarea className="reply-input"></textarea>
          <button className="replybtn">댓글 달기</button>
        </div>
        <div className="pagination-line"></div>
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages"></div>
        </div>
      </div>
    </div>
  );
};

export default BestPostView;
