import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../GatheringPostView.css";
import ListGroup from "react-bootstrap/ListGroup";
import { useHistory, useParams, Outlet } from "react-router-dom";
import gatherings from "./Gathering";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";
import ParentComment from "./ParentComment";

const GatheringPostView = (props, { history }) => {
  const gatherings = props.component;
  const num = gatherings.length;
  const { gatheringNoCategory } = useParams();

  const matchItem = props.component.find(function (element) {
    if (element.gatheringNoCategory === gatheringNoCategory) return true;
  });

  const categoryName = () => {
    if (matchItem.category === "exercise") return "운동";

    if (matchItem.category === "parents") return "학부모";

    if (matchItem.category === "hobby") return "취미";

    if (matchItem.category === "foodplace") return "맛집탐방";

    if (matchItem.category === "animal") return "반려동물";
  };

  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [count, setCount] = useState(0);

  const getValue = (e) => {
    setCommentContents(e.target.value);
  };

  let body = {
    comment: commentContents,
    index: count,
    responseTo: null,
  };

  const addComment = (e) => {
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }
    e.preventDefault();

    setCount(count + 1);
    setCommentList(commentList.concat(body));
    setCommentContents("");
  };

  const beforeShowComments = commentList.filter((comment) => {
    return comment.responseTo === null;
  });

  const showComments = beforeShowComments.map((parentComment, index) => {
    return (
      <ParentComment
        parentComment={parentComment}
        index={index}
        commentList={commentList}
        setCommentList={setCommentList}
      ></ParentComment>
    );
  });

  const postList =
    parseInt(matchItem.constGatheringNo) === 1
      ? gatherings.slice(
          parseInt(matchItem.constGatheringNo) - 1,
          parseInt(matchItem.constGatheringNo) + 4
        )
      : parseInt(matchItem.constGatheringNo) === 2
      ? gatherings.slice(
          parseInt(matchItem.constGatheringNo) - 2,
          parseInt(matchItem.constGatheringNo) + 3
        )
      : parseInt(matchItem.constGatheringNo) === parseInt(num) - 1
      ? gatherings.slice(
          parseInt(matchItem.constGatheringNo) - 4,
          parseInt(matchItem.constGatheringNo) + 1
        )
      : parseInt(matchItem.constGatheringNo) === parseInt(num)
      ? gatherings.slice(
          parseInt(matchItem.constGatheringNo) - 5,
          parseInt(matchItem.constGatheringNo) + 0
        )
      : gatherings.slice(
          parseInt(matchItem.constGatheringNo) - 3,
          parseInt(matchItem.constGatheringNo) + 2
        );

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">모임 모집 게시판</span>
        </div>
        <div className="line"></div>
        <div className="gatheringPostView-section1">
          <span className="gatheringPostView-title">{matchItem.title}</span>
          <div className="gatheringPostView-subtitle">
            <span>{matchItem.title}</span>
            <span>/</span>
            <span>작성자: {matchItem.member_id}</span>
          </div>
          <div className="gatheringPostView-content">
            {matchItem.cont.split("\n").map((line) => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })}
          </div>
        </div>
        <div className="category-line"></div>
        <div className="category-name">카테고리</div>
        <div className="category">
          <span className="category-type">{categoryName()}</span>
        </div>
        <div className="relpy-line"></div>
        <div className="gatheringPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">오새별</div>
          <textarea
            className="reply-input"
            onChange={(e) => getValue(e)}
            type="text"
            value={commentContents}
          ></textarea>
          <div className="outreplybtn">
            <button className="replybtn" onClick={(e) => addComment(e)}>
              댓글 달기
            </button>
          </div>
          <div>{showComments}</div>
        </div>
        <div className="pagination-line"></div>
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return item.complete === "false" ? (
                    <div
                      className="postlist"
                      key={index}
                      style={{ backgroundColor: "rgba(215, 215, 215, 0.7)" }}
                    >
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-complete">모집완료</div>
                      <div className="postlist-date">{item.date}</div>
                    </div>
                  ) : parseInt(item.gatheringNoCategory) ===
                    parseInt(matchItem.gatheringNoCategory) ? (
                    <Link
                      to={`/gatheringPostView/${item.gatheringNoCategory}`}
                      style={{ textDecoration: "none", color: "#ffa800" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">{item.date}</div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/gatheringPostView/${item.gatheringNoCategory}`}
                      style={{ textDecoration: "none", color: "#443333" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">{item.date}</div>
                      </div>
                    </Link>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatheringPostView;
