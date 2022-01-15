import React, { useState } from "react";
import BestForm from "./BestForm";
import Navbar from "./Navbar";
import Header from "./Header";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../Best.css";
import "../Paging.css";
import Pagination from "react-js-pagination";
//* https://cotak.tistory.com/112 */
//  npm i react-js-pagination

const Best = () => {
  const [bests, setBests] = useState([
    {
      title: "음식 제목 1",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "food",
      no: 1,
    },
    {
      title: "음식 제목 2",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      category: "food",
      date: "2021.10.31 19:11",
      no: 2,
    },
    {
      title: "학원 제목 1",
      img: "../img/best-test-img-academy.PNG",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 3,
    },
    {
      title: "학원 제목 2",
      img: "../img/best-test-img-academy.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 4,
    },
    {
      title: "카페 제목 1",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 5,
    },
    {
      title: "운동 제목 1",
      img: "../img/best-test-img-sports.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "sports",
      no: 6,
    },
    {
      title: "카페 제목 2",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 7,
    },
    {
      title: "학원 제목 3",
      img: "../img/best-test-img-academy.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 8,
    },
    {
      title: "음식 제목 3",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "food",
      no: 9,
    },
    {
      title: "카페 제목 3",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 10,
    },
    {
      title: "음식 제목 4",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "food",
      no: 11,
    },
    {
      title: "음식 제목 5",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      category: "food",
      date: "2021.10.31 19:11",
      no: 12,
    },
    {
      title: "학원 제목 4",
      img: "../img/best-test-img-academy.PNG",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 13,
    },
    {
      title: "학원 제목 5",
      img: "../img/best-test-img-academy.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 14,
    },
    {
      title: "카페 제목 4",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 15,
    },
    {
      title: "운동 제목 2",
      img: "../img/best-test-img-sports.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "sports",
      no: 16,
    },
    {
      title: "카페 제목 5",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 17,
    },
    {
      title: "학원 제목 6",
      img: "../img/best-test-img-academy.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 18,
    },
    {
      title: "음식 제목 6",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "food",
      no: 19,
    },
    {
      title: "카페 제목 6",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 20,
    },
    {
      title: "카페 제목 7",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 21,
    },
    {
      title: "학원 제목 7",
      img: "../img/best-test-img-academy.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "academy",
      no: 22,
    },
    {
      title: "음식 제목 7",
      img: "../img/best-test-img-food.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "food",
      no: 23,
    },
    {
      title: "카페 제목 8",
      img: "../img/best-test-img-cafe.png",
      cont: "오늘은 친구들과 함께 당고집을 갔어요! ><가봤는데 당고가 비주얼이 너무 좋아서 1차 기쁨!! 한 입 먹었는데 맛도 너무 좋아서...",
      date: "2021.10.31 19:11",
      category: "cafe",
      no: 24,
    },
  ]);

  const [page, setPage] = useState(1);
  const [renderPage, setRenderPage] = useState("unfocused");
  const [getName, setGetName] = useState("");

  // 초기에는 unfocused 상태
  // focused 상태였다가 unfocused 상태가 다시 될 때 no 값 다시 지정
  let a = 1;
  const BeforeonClicksetPage = bests.map((best) => {
    best.no = a;
    a++;
    return best;
  });

  // unfocused 상태일 때 각 페이지에 보여줄 객체들 필터
  const onClicksetPage = BeforeonClicksetPage.filter((best) => {
    return (page - 1) * 9 + 1 <= best.no && best.no <= (page - 1) * 9 + 9;
  });

  // unfocused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const renderBests = onClicksetPage.map((best) => {
    return (
      <div className="best-flex">
        <BestForm
          best={best}
          key={best.no}
          title={best.title}
          id={best.id}
        ></BestForm>
      </div>
    );
  });

  // unfocused 상태일 때
  // 처음에 보여주는 페이지는 1 페이지
  // focused -> unfocused 되기
  // 위의 함수들 실행
  const onBlurButton = () => {
    console.log("onBlurButton");
    setPage(1);
    setRenderPage("unfocused");
    BeforeonClicksetPage();
    onClicksetPage();
    renderBests();
    return null;
  };

  // 버튼을 클릭했을 때
  // unfocusesd -> focused
  // 버튼의 name 가져온다
  const onClickButtonGetName = (e) => {
    let getName = "";
    setRenderPage("focused");
    return setGetName(getName.concat(e));
  };

  // name과 케테고리가 일치하는 것만 필터링
  const onClickButtonClassify = bests.filter((best) => {
    return best.category === getName;
  });

  // no 값 재지정
  let i = 1;
  const onClickButtonSetForm = onClickButtonClassify.map((best) => {
    best.no = i;
    i++;
    return best;
  });

  // no 값에 따라 페이지별로 보여줄 객체들 필터링
  const onClickButtonsetPage = onClickButtonSetForm.filter((best) => {
    return (page - 1) * 9 + 1 <= best.no && best.no <= (page - 1) * 9 + 9;
  });

  // focused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const onClickButtonrenderBests = onClickButtonsetPage.map((best) => {
    return (
      <div className="best-flex">
        <BestForm
          best={best}
          key={best.no}
          title={best.title}
          id={best.id}
        ></BestForm>
      </div>
    );
  });

  // 버튼 클릭하면
  // 위 함수들 실행
  // 처음에 보옂는 페이지는 1 페이지
  const onClickButton = (e) => {
    setPage(1);
    onClickButtonGetName(e);
    onClickButtonClassify();
    onClickButtonSetForm();
    onClickButtonsetPage();
    return null;
  };

  const handlePageChange = (page) => {
    setRenderPage("unfocused");
    setPage(page);
    window.scrollTo(0, 0);
  };

  const FocusedHandlePageChange = (page) => {
    setRenderPage("focused");
    setPage(page);
    window.scrollTo(0, 0);
  };

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
              <button name="food" className="keyword" onFocus={onBlurButton}>
                전체
              </button>
              <button
                name="food"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                맛집
              </button>
              <button
                name="academy"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                학원
              </button>
              <button
                name="cafe"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                카페
              </button>
              <button
                name="sports"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                운동시설
              </button>
            </span>
            <span className="search">
              <img className="best-search-btn" src="../img/search.png"></img>
              <input className="best-input"></input>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="best-section2">
          {renderPage === "unfocused" ? renderBests : onClickButtonrenderBests}
        </div>
      </div>
      <div>
        {/* https://cotak.tistory.com/112 */}
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={
            renderPage === "unfocused"
              ? parseInt(BeforeonClicksetPage.length % 9) === 0
                ? parseInt(BeforeonClicksetPage.length / 9) * 5
                : (parseInt(BeforeonClicksetPage.length / 9) + 1) * 5
              : parseInt(onClickButtonSetForm.length % 9) === 0
              ? parseInt(onClickButtonSetForm.length / 9) * 5
              : (parseInt(onClickButtonSetForm.length / 9) + 1) * 5
          }
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
          onFocus={(e) => {
            onClickButton(e.target.name);
          }}
          onChange={
            renderPage === "unfocused"
              ? handlePageChange
              : FocusedHandlePageChange
          }
        />
      </div>
    </div>
  );
};

export default Best;
