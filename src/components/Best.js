import React, { useState } from "react";
import BestForm from "./BestForm";
import Navbar from "./Navbar";
import Header from "./Header";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../Best.css";
import Paging from "./Paging";

const Best = () => {
  const [bests, setBests] = useState([
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 1,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 2,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 3,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 4,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 5,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 6,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 7,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 8,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 9,
    },
    {
      title: "당고집 추천!",
      img: "../img/best-test-img.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      no: 10,
    },
  ]);

  const renderBests = bests.map((best) => {
    return (
      <div className="best-flex">
        <BestForm best={best} key={best.no}></BestForm>
      </div>
    );
  });

  const [page, setPage] = useState(1);

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">추천게시판</span>
          <span className="section1-right">
            <Link to="/bestAdd">
              <button className="best-add-btn">글 쓰기</button>
            </Link>
          </span>
          <div className="section1-bottom">
            <div>HOT 카테고리</div>
            <span className="keywords">
              <button className="keyword">맛집</button>
              <button className="keyword">학원</button>
              <button className="keyword">카페</button>
              <button className="keyword">운동시설</button>
            </span>
            <span className="search">
              <img className="best-search-btn" src="../img/search.png"></img>
              <input className="best-input"></input>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="best-section2">{renderBests}</div>
      </div>
      <div>
        <Paging
          page={page}
          count={parseInt(bests.length / 9 + 1)}
          setPage={setPage}
        ></Paging>
      </div>
    </div>
  );
};

export default Best;
