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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GatheringPostView = () => {
  const { id } = useParams();
  const [gathering, setGathering] = useState([]);
  const [gatherings, setGatherings] = useState([]);
  const num = gatherings.length;
  const navigate = useNavigate();

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 전체 게시글 정보를 불러와서 gatherings에 저장
  useEffect(() => {
    axios
      .get("/apartments/gatherings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //console.log("success");
        setGatherings(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 해당 게시글 정보를 불러와서 gathering에 저장
  useEffect(() => {
    axios
      .get("/gathering/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setGathering(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 현재 로그인된 유저 정보 - 닉네임을 author, nickname에 저장
  const [author, setAuthor] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setNickname(res.data.nickName);
        setAuthor(res.data.nickName);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // complete 버튼 보여주기 여부 결정 관련 함수
  const showNickName = (e) => {
    if (String(nickname) === String(gathering.author)) {
      return (
        <button
          className="gatheringPostView-button"
          onClick={(e) => onClickButton(e)}
        >
          모집완료
        </button>
      );
    }
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 모집 완료 버튼 누르면 실행되는 함수
  const onClickButton = (e) => {
    e.preventDefault();
    alert("모집완료 처리가 되었습니다");
    axios
      .put("/gathering/" + id, { complete: true })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/gathering");
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 삭제 버튼 누를 때 실행
  const onClickDeleteButton = (e) => {
    e.preventDefault();
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete("/gathering/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          navigate("/best");
        })
        .catch((err) => console.log(err));
    } else {
      alert("취소합니다.");
    }
  };

  // 게시글 삭제 버튼 보여주는 코드
  const showDeleteButton = (e) => {
    if (String(nickname) === String(gathering.author)) {
      return (
        <button
          className="gathering-deleteButton"
          onClick={(e) => onClickDeleteButton(e)}
        >
          | 게시글 삭제 |
        </button>
      );
    }
  };

  // 이전글/다음글
  let a = 1;
  gatherings.map((gatheringE) => {
    gatheringE.gatheringNo = a;
    if (gathering.id === gatheringE.id) {
      gathering.gatheringNo = a;
    }
    a = a + 1;
  });

  const postList =
    parseInt(gatherings.length) <= 5
      ? gatherings
      : parseInt(gathering.gatheringNo) === 1
      ? gatherings.slice(
          parseInt(gathering.gatheringNo) - 1,
          parseInt(gathering.gatheringNo) + 4
        )
      : parseInt(gathering.gatheringNo) === 2
      ? gatherings.slice(
          parseInt(gathering.gatheringNo) - 2,
          parseInt(gathering.gatheringNo) + 3
        )
      : parseInt(gathering.gatheringNo) === parseInt(num) - 1
      ? gatherings.slice(
          parseInt(gathering.gatheringNo) - 4,
          parseInt(gathering.gatheringNo) + 1
        )
      : parseInt(gathering.gatheringNo) === parseInt(num)
      ? gatherings.slice(
          parseInt(gathering.gatheringNo) - 5,
          parseInt(gathering.gatheringNo) + 0
        )
      : gatherings.slice(
          parseInt(gathering.gatheringNo) - 3,
          parseInt(gathering.gatheringNo) + 2
        );

  // 카테고리 이름 보여주는 함수
  const categoryName = () => {
    if (gathering.category === "exercise") return "운동";

    if (gathering.category === "parents") return "학부모";

    if (gathering.category === "hobby") return "취미";

    if (gathering.category === "foodplace") return "맛집탐방";

    if (gathering.category === "animal") return "반려동물";
  };

  // <대댓글 구현>
  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [responseTo, setResponseTo] = useState(0);
  const commentPageType = "gathering";

  // 댓글, 대댓글 get 해오기
  useEffect(
    (e) => {
      axios
        .get("/gathering/comment/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          // commentList 초기화 및 get 해온 댓글, 대댓글 추가
          setCommentList([]);
          if (commentList.length === 0) {
            setCommentList(commentList.concat(res.data));
          }
        })
        .catch((err) => console.log(err));
    },
    [useParams()]
  );

  // 댓글들 보여주기
  const beforeShowComments = commentList.filter((comment) => {
    return comment.commentType === "parent";
  });

  const showComments =
    commentList === []
      ? null
      : beforeShowComments.map((parentComment, index) => {
          return (
            <ParentComment
              parentComment={parentComment}
              commentList={commentList}
              setCommentList={setCommentList}
              id={id}
              index={index}
              author={author}
              commentPageType={commentPageType}
            ></ParentComment>
          );
        });

  // 댓글 작성 => commentContents에 저장
  const getValue = (e) => {
    setCommentContents(e.target.value);
  };

  // 댓글 작성 버튼 누를 때
  const addComment = (e) => {
    e.preventDefault();
    // 댓글 없으면 alert 띄우기
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }

    let body = {
      content: commentContents,
      commentType: "parent",
      userNickName: author,
    };
    setCommentList(commentList.concat(body));
    setCommentContents("");
    axios
      .post(
        "/comment/" + id,
        {
          postCategory: commentPageType,
          content: commentContents,
          responseTo: responseTo,
          commentType: "parent",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  function refreshPage(e) {
    e.preventDefault();
    window.location.reload();
  }

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
          <div>{showDeleteButton()}</div>
          <span className="gatheringPostView-title">{gathering.title}</span>
          <div className="gatheringPostView-subtitle">
            <span>{gathering.title}</span>
            <span>/</span>
            <span>작성자: {gathering.author}</span>
          </div>
          <div>{showNickName()}</div>
          <div className="gatheringPostView-content">
            {String(gathering.content)
              .split("\n")
              .map((line) => {
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
          <div className="reply-id">{gathering.author}</div>
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
          <div onClick={(e) => refreshPage(e)}>새로고침하기</div>
          <div>{showComments}</div>
        </div>
        <div className="pagination-line"></div>
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return item.complete === true ? (
                    <div
                      className="postlist"
                      key={index}
                      style={{ backgroundColor: "rgba(215, 215, 215, 0.7)" }}
                    >
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-complete">모집완료</div>
                      <div className="postlist-date">{item.date}</div>
                    </div>
                  ) : parseInt(item.id) === parseInt(gathering.id) ? (
                    <Link
                      to={`/gatheringPostView/${item.id}`}
                      style={{ textDecoration: "none", color: "#ffa800" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">
                          {String(item.createdDate).substr(0, 10)}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/gatheringPostView/${item.id}`}
                      style={{ textDecoration: "none", color: "#443333" }}
                      onClick={window.scrollTo(0, 0)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">
                          {String(item.createdDate).substr(0, 10)}
                        </div>
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