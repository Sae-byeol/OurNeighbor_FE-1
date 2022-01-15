import React, { useState } from "react";
import GatheringForm from "./GatheringForm";
import GatheringFormComplete from "./GatheringFormComplete";
import Navbar from "./Navbar";
import Header from "./Header";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../Gathering.css";
import "../Paging.css";
import Pagination from "react-js-pagination";

const Gathering = () => {
  const [gatherings, setGatherings] = useState([
    {
      title: "운동1",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 1,
    },
    {
      title: "학부모1",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "parents",
      complete: "false",
      no: 2,
    },
    {
      title: "취미1",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "hobby",
      complete: "true",
      no: 3,
    },
    {
      title: "맛집탐방1",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "foodplace",
      complete: "true",
      no: 4,
    },
    {
      title: "반려동물1",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "animal",
      complete: "true",
      no: 5,
    },
    {
      title: "운동2",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 6,
    },
    {
      title: "학부모2",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "parents",
      complete: "false",
      no: 7,
    },
    {
      title: "취미2",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "hobby",
      complete: "true",
      no: 8,
    },
    {
      title: "맛집탐방2",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "foodplace",
      complete: "true",
      no: 9,
    },
    {
      title: "반려동물2",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "animal",
      complete: "true",
      no: 10,
    },
    {
      title: "운동3",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 11,
    },
    {
      title: "운동4",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 12,
    },
    {
      title: "운동5",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "false",
      no: 13,
    },
    {
      title: "운동6",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 14,
    },
    {
      title: "운동7",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 15,
    },
    {
      title: "운동8",
      cont: "매일 한강 도로변 같이 뛰실 분들 구합니다!",
      date: "2021.10.31 19:11",
      category: "exercise",
      complete: "true",
      no: 16,
    },
  ]);

  const [page, setPage] = useState(1);
  const [renderPage, setRenderPage] = useState("unfocused");
  const [getName, setGetName] = useState("");

  // 초기에는 unfocused 상태
  // focused 상태였다가 unfocused 상태가 다시 될 때 no 값 다시 지정
  let a = 1;
  const BeforeonClicksetPage = gatherings.map((best) => {
    best.no = a;
    a++;
    return best;
  });

  // unfocused 상태일 때 각 페이지에 보여줄 객체들 필터
  const onClicksetPage = BeforeonClicksetPage.filter((gathering) => {
    return (
      (page - 1) * 7 + 1 <= gathering.no && gathering.no <= (page - 1) * 7 + 7
    );
  });

  // unfocused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const renderGatherings = onClicksetPage.map((gathering) => {
    return gathering.complete === "true" ? (
      <div className="gathering-flex">
        <GatheringForm
          gathering={gathering}
          key={gathering.no}
          title={gathering.title}
          id={gathering.id}
        ></GatheringForm>
      </div>
    ) : (
      <GatheringFormComplete
        gathering={gathering}
        key={gathering.no}
        title={gathering.title}
        id={gathering.id}
      ></GatheringFormComplete>
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
    renderGatherings();
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
  const onClickButtonClassify = gatherings.filter((best) => {
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
    return (page - 1) * 7 + 1 <= best.no && best.no <= (page - 1) * 7 + 7;
  });

  // focused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const onClickrenderGatherings = onClickButtonsetPage.map((gathering) => {
    return gathering.complete === "true" ? (
      <div className="gathering-flex">
        <GatheringForm
          gathering={gathering}
          key={gathering.no}
          title={gathering.title}
          id={gathering.id}
        ></GatheringForm>
      </div>
    ) : (
      <GatheringFormComplete
        gathering={gathering}
        key={gathering.no}
        title={gathering.title}
        id={gathering.id}
      ></GatheringFormComplete>
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
            <Link to="/gatheringAdd">
              <button className="gathering-add-btn">글 쓰기</button>
            </Link>
          </span>
          <div className="section1-bottom">
            <div>HOT 카테고리</div>
            <span className="keywords">
              <button className="keyword" onFocus={onBlurButton}>
                전체
              </button>
              <button
                name="exercise"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                운동
              </button>
              <button
                name="parents"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                학부모
              </button>
              <button
                name="hobby"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                취미
              </button>
              <button
                name="foodplace"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                맛집탐방
              </button>
              <button
                name="animal"
                className="keyword"
                onFocus={(e) => {
                  onClickButton(e.target.name);
                }}
              >
                반려동물
              </button>
            </span>
            <span className="search">
              <img
                className="gathering-search-btn"
                src="../img/search.png"
              ></img>
              <input className="gathering-input"></input>
            </span>
          </div>
        </div>
        <div className="line"></div>
        <div className="gathering-section2">
          {renderPage === "unfocused"
            ? renderGatherings
            : onClickrenderGatherings}
        </div>
      </div>
      <div>
        <Pagination
          activePage={page}
          itemsCountPerPage={5}
          totalItemsCount={
            renderPage === "unfocused"
              ? parseInt(BeforeonClicksetPage.length % 7) === 0
                ? parseInt(BeforeonClicksetPage.length / 7) * 5
                : (parseInt(BeforeonClicksetPage.length / 7) + 1) * 5
              : parseInt(onClickButtonSetForm.length % 7) === 0
              ? parseInt(onClickButtonSetForm.length / 7) * 5
              : (parseInt(onClickButtonSetForm.length / 7) + 1) * 5
          }
          pageRangeDisplayed={5}
          prevPageText={"<"}
          nextPageText={">"}
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

export default Gathering;
