import React, { useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../BestAdd.css";

const BestAdd = () => {
  const [marketTitle, setMarketTitle] = useState("");
  const [marketContent, setMarketContent] = useState("");
  const [category, setCategory] = useState("");

  const [buttonColor, setButtonColor] = useState("all");

  const [showFoodCategory, setShowFoodCategory] = useState(false);
  const [showAcademyCategory, setShowAcademyCategory] = useState(false);
  const [showCafeCategory, setShowCafeCategory] = useState(false);
  const [showSportsCategory, setShowSportsCategory] = useState(false);

  const onShowFoodCategory = () => {
    setShowFoodCategory(true);
  };
  const onShowAcademyCategory = () => {
    setShowAcademyCategory(true);
  };
  const onShowCafeCategory = () => {
    setShowCafeCategory(true);
  };
  const onShowSportsCategory = () => {
    setShowSportsCategory(true);
  };

  const colorFood = buttonColor === "food" ? "#ffefb6" : "white";
  const colorAcademy = buttonColor === "academy" ? "#ffefb6" : "white";
  const colorCafe = buttonColor === "cafe" ? "#ffefb6" : "white";
  const colorSports = buttonColor === "sports" ? "#ffefb6" : "white";

  const defineColor = (e) => {
    e === "all"
      ? setButtonColor("all")
      : e === "food"
      ? setButtonColor("food")
      : e === "academy"
      ? setButtonColor("academy")
      : e === "cafe"
      ? setButtonColor("cafe")
      : e === "sports"
      ? setButtonColor("sports")
      : setButtonColor("all");
  };

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">추천 게시판</span>
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
            <div className="marketAddContent">내용</div>
            <textarea
              className="marketAddTextarea"
              type="text"
              value={marketContent}
            />
            <input
              type="file"
              className="imgInput"
              id="marketImg"
              accept="image/*"
              name="file"
            ></input>
            <div>카테고리</div>
            <div className="">
              {showFoodCategory && (
                <div name="food" className="best-keyword">
                  맛집
                </div>
              )}
              {showAcademyCategory && (
                <div name="academy" className="best-keyword">
                  학원
                </div>
              )}
              {showCafeCategory && (
                <div name="cafe" className="best-keyword">
                  카페
                </div>
              )}
              {showSportsCategory && (
                <div name="sports" className="best-keyword">
                  운동시설
                </div>
              )}
            </div>
            <div>HOT 카테고리</div>

            <div>
              <button
                name="food"
                className="best-keyword"
                style={{ backgroundColor: colorFood }}
                onClick={onShowFoodCategory}
              >
                맛집
              </button>
              <button
                name="academy"
                className="best-keyword"
                style={{ backgroundColor: colorAcademy }}
                onClick={onShowAcademyCategory}
              >
                학원
              </button>
              <button
                name="cafe"
                className="best-keyword"
                style={{ backgroundColor: colorCafe }}
                onClick={onShowCafeCategory}
              >
                카페
              </button>
              <button
                name="sports"
                className="best-keyword"
                style={{ backgroundColor: colorSports }}
                onClick={onShowSportsCategory}
              >
                운동시설
              </button>
            </div>
            <button className="marketAddCompleteBtn">작성 완료</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BestAdd;
