import React, { useState } from "react";
import GatheringForm from "./GatheringForm";
import GatheringFormComplete from "./GatheringFormComplete";
import Navbar from "./Navbar";
import Header from "./Header";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import "../Gathering.css";
import "../Paging.css";
import Pagination from "react-js-pagination";

const Gathering = (props) => {
  const gatherings = props.component;
  const [page, setPage] = useState(1);
  const [renderPage, setRenderPage] = useState("unfocused");
  const [buttonColor, setButtonColor] = useState("all");
  const [getName, setGetName] = useState("");
  const [search, setSearch] = useState(null);
  const [searchingText, setSearchingText] = useState(null);

  const searchSpace = (e) => {
    setSearch(e);
  };

  const searchedGatherings = gatherings.filter((best) => {
    if (search === "") return best;
    if (search === null) return best;
    else if (
      best.title.toLowerCase().includes(search.toLowerCase()) ||
      best.cont.toLowerCase().includes(search.toLowerCase())
    ) {
      return best;
    }
  });

  // 초기에는 unfocused 상태
  // focused 상태였다가 unfocused 상태가 다시 될 때 gatheringNo 값 다시 지정
  let a = 1;
  const BeforeonClicksetPage = searchedGatherings.map((best) => {
    best.gatheringNo = a;
    a++;
    return best;
  });

  // unfocused 상태일 때 각 페이지에 보여줄 객체들 필터
  const onClicksetPage = BeforeonClicksetPage.filter((gathering) => {
    return (
      (page - 1) * 7 + 1 <= gathering.gatheringNo &&
      gathering.gatheringNo <= (page - 1) * 7 + 7
    );
  });

  // unfocused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const renderGatherings = onClicksetPage.map((gathering) => {
    return gathering.complete === "true" ? (
      <div className="gathering-flex">
        <GatheringForm
          gathering={gathering}
          key={gathering.gatheringNo}
          title={gathering.title}
          id={gathering.id}
        ></GatheringForm>
      </div>
    ) : (
      <GatheringFormComplete
        gathering={gathering}
        key={gathering.gatheringNo}
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
  const onClickButtonClassify = searchedGatherings.filter((best) => {
    return best.category === getName;
  });

  // gatheringNo 값 재지정
  let i = 1;
  const onClickButtonSetForm = onClickButtonClassify.map((best) => {
    best.gatheringNo = i;
    i++;
    return best;
  });

  // gatheringNo 값에 따라 페이지별로 보여줄 객체들 필터링
  const onClickButtonsetPage = onClickButtonSetForm.filter((best) => {
    return (
      (page - 1) * 7 + 1 <= best.gatheringNo &&
      best.gatheringNo <= (page - 1) * 7 + 7
    );
  });

  // focused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
  const onClickrenderGatherings = onClickButtonsetPage.map((gathering) => {
    return gathering.complete === "true" ? (
      <div className="gathering-flex">
        <GatheringForm
          gathering={gathering}
          key={gathering.gatheringNo}
          title={gathering.title}
          id={gathering.id}
        ></GatheringForm>
      </div>
    ) : (
      <GatheringFormComplete
        gathering={gathering}
        key={gathering.gatheringNo}
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

  const colorAll = buttonColor === "all" ? "#ffefb6" : "white";
  const colorExercise = buttonColor === "exercise" ? "#ffefb6" : "white";
  const colorParents = buttonColor === "parents" ? "#ffefb6" : "white";
  const colorHobby = buttonColor === "hobby" ? "#ffefb6" : "white";
  const colorFoodPlace = buttonColor === "foodplace" ? "#ffefb6" : "white";
  const colorAnimal = buttonColor === "animal" ? "#ffefb6" : "white";

  const defineColor = (e) => {
    e === "all"
      ? setButtonColor("all")
      : e === "exercise"
      ? setButtonColor("exercise")
      : e === "parents"
      ? setButtonColor("parents")
      : e === "hobby"
      ? setButtonColor("hobby")
      : e === "foodplace"
      ? setButtonColor("foodplace")
      : e === "animal"
      ? setButtonColor("animal")
      : setButtonColor("all");
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="gathering-section1">
          <span className="gathering-sub-title1">모임 모집 게시판</span>
          <span className="gathering-section1-right">
            <Link to="/gatheringAdd">
              <button className="gathering-add-btn">글 쓰기</button>
            </Link>
          </span>
          <div className="gathering-section1-bottom">
            <div>HOT 카테고리</div>
            <span className="keywords">
              <button
                name="all"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={onBlurButton}
                style={{ backgroundColor: colorAll }}
              >
                전체
              </button>
              <button
                name="exercise"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={(e) => {
                  onClickButton(e.target.name);
                }}
                style={{ backgroundColor: colorExercise }}
              >
                운동
              </button>
              <button
                name="parents"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={(e) => {
                  onClickButton(e.target.name);
                }}
                style={{ backgroundColor: colorParents }}
              >
                학부모
              </button>
              <button
                name="hobby"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={(e) => {
                  onClickButton(e.target.name);
                }}
                style={{ backgroundColor: colorHobby }}
              >
                취미
              </button>
              <button
                name="foodplace"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={(e) => {
                  onClickButton(e.target.name);
                }}
                style={{ backgroundColor: colorFoodPlace }}
              >
                맛집탐방
              </button>
              <button
                name="animal"
                className="gathering-keyword"
                onFocus={(e) => {
                  defineColor(e.target.name);
                }}
                onClick={(e) => {
                  onClickButton(e.target.name);
                }}
                style={{ backgroundColor: colorAnimal }}
              >
                반려동물
              </button>
            </span>
            <span className="search">
              <img
                className="gathering-search-btn"
                src="../img/search.png"
              ></img>
              <input
                className="gathering-input"
                placeholder="제목 / 내용 검색"
                value={searchingText}
                onChange={(e) => {
                  setSearchingText(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    searchSpace(e.target.value);
                  }
                }}
              ></input>
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
