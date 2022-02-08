import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringAdd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GatheringAdd = () => {
  const [gatheringTitle, setGathering] = useState("");
  const [gatheringContent, setGatheringContent] = useState("");
  const navigate = useNavigate();

  // 카테고리 뜨기
  const [showCategory, setShowCategory] = useState("none");

  const onShowCategory = (e) => {
    if (e.target.name === "exercise") {
      e.preventDefault();
      setShowCategory("exercise");
    }
    if (e.target.name === "parents") {
      e.preventDefault();
      setShowCategory("parents");
    }
    if (e.target.name === "hobby") {
      e.preventDefault();
      setShowCategory("hobby");
    }
    if (e.target.name === "foodplace") {
      e.preventDefault();
      setShowCategory("foodplace");
    }
    if (e.target.name === "animal") {
      e.preventDefault();
      setShowCategory("animal");
    }
  };

  const onClickNone = () => {
    setShowCategory("none");
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  const onSubmit = (e) => {
    e.preventDefault();
    //add함수 props로 받아오기
    if (
      gatheringTitle === "" ||
      gatheringContent === "" ||
      showCategory === "none"
    ) {
      Swal.fire({
        icon: "warning",
        title: "제목, 내용, 카테고리를 모두 입력해주세요.",
      });
    } else {
      axios
        .post(
          "/gathering",
          `title=${gatheringTitle}&&content=${gatheringContent}&&category=${showCategory}`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "글이 정상적으로 작성되었습니다.",
          });
          if (res.data) {
            navigate("/gathering");
          }
        });
    }
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
        <div className="gatheringAdd-section2">
          <form>
            <span className="gatheringAddTitle">제목</span>
            <input
              className="gatheringAddTitleInput"
              type="text"
              onChange={(e) => setGathering(e.target.value)}
              value={gatheringTitle}
            />
            <div className="gatheringAddContent">내용</div>
            <textarea
              className="gatheringAddTextarea"
              type="text"
              value={gatheringContent}
              onChange={(e) => setGatheringContent(e.target.value)}
            />
            <div className="gathering-categoryText">카테고리</div>
            <div className="gathering-selectedCategories">
              {showCategory === "exercise" && (
                <div className="gathering-selectedCategory">
                  <div
                    name="exercise"
                    className="gatheringAdd-keyword"
                    style={{
                      width: "85px",
                      height: "22px",
                    }}
                  >
                    운동
                  </div>
                  <div onClick={onClickNone} className="gathering-unshown">
                    -
                  </div>
                </div>
              )}
              {showCategory === "parents" && (
                <div className="gathering-selectedCategory">
                  <div
                    name="parents"
                    className="gatheringAdd-keyword"
                    style={{
                      width: "85px",
                      height: "22px",
                    }}
                  >
                    학부모
                  </div>
                  <div onClick={onClickNone} className="gathering-unshown">
                    -
                  </div>
                </div>
              )}
              {showCategory === "hobby" && (
                <div className="best-selectedCategory">
                  <div
                    name="hobby"
                    className="gatheringAdd-keyword"
                    style={{
                      width: "85px",
                      height: "22px",
                    }}
                  >
                    취미
                  </div>
                  <div onClick={onClickNone} className="gathering-unshown">
                    -
                  </div>
                </div>
              )}
              {showCategory === "foodplace" && (
                <div className="gathering-selectedCategory">
                  <div
                    name="foodplace"
                    className="gatheringAdd-keyword"
                    style={{
                      width: "85px",
                      height: "22px",
                    }}
                  >
                    맛집탐방
                  </div>
                  <div onClick={onClickNone} className="gathering-unshown">
                    -
                  </div>
                </div>
              )}
              {showCategory === "animal" && (
                <div className="gathering-selectedCategory">
                  <div
                    name="animal"
                    className="gatheringAdd-keyword"
                    style={{
                      width: "85px",
                      height: "22px",
                    }}
                  >
                    반려동물
                  </div>
                  <div onClick={onClickNone} className="gathering-unshown">
                    -
                  </div>
                </div>
              )}
            </div>
            <div className="gathering-hotCategoryText">HOT 카테고리</div>
            <div className="gathering-hotCategory">
              <button
                name="exercise"
                className="gatheringAdd-keyword"
                onClick={(e) => onShowCategory(e)}
                style={{ backgroundColor: "white" }}
              >
                운동
              </button>
              <button
                name="parents"
                className="gatheringAdd-keyword"
                onClick={(e) => onShowCategory(e)}
                style={{ backgroundColor: "white" }}
              >
                학부모
              </button>
              <button
                name="hobby"
                className="gatheringAdd-keyword"
                onClick={(e) => onShowCategory(e)}
                style={{ backgroundColor: "white" }}
              >
                취미
              </button>
              <button
                name="foodplace"
                className="gatheringAdd-keyword"
                onClick={(e) => onShowCategory(e)}
                style={{ backgroundColor: "white" }}
              >
                맛집탐방
              </button>
              <button
                name="animal"
                className="gatheringAdd-keyword"
                onClick={(e) => onShowCategory(e)}
                style={{ backgroundColor: "white" }}
              >
                반려동물
              </button>
            </div>
            <button className="gatheringAddCompleteBtn" onClick={onSubmit}>
              작성 완료
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GatheringAdd;