import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../MarketPostView.css";
import "../PostList.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useHistory, useParams, Outlet } from "react-router-dom";
import markets from "./Market";
import ParentComment from "./ParentComment";
import axios from "axios";
import { asRoughMinutes } from "@fullcalendar/react";
import { useNavigate } from "react-router-dom";

const MarketPostView = (props) => {
  const { id } = useParams();
  const [market, setMarket] = useState({});
  const [markets, setMarkets] = useState([]);
  const num = markets.length;
  const navigate = useNavigate();

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 전체 게시글 정보를 불러와서 markets에 저장
  useEffect(() => {
    axios
      .get("/apartments/used-goods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setMarkets(res.data);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 해당 게시글 정보를 불러와서 market에 저장
  const [image, setImage] = useState();
  useEffect(() => {
    axios
      .get("/used-goods/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMarket(res.data);
        axios({
          method: "GET",
          url: "/photo/" + res.data.photoId[0],
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => {
            console.log(res.data);
            setImage(
              window.URL.createObjectURL(
                new Blob([res.data], { type: res.headers["content-type"] })
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 현재 로그인된 유저 정보 - 닉네임을 author에 저장
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setAuthor(res.data.nickName);
        console.log(author);
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 삭제 버튼 누를 때 실행
  const onClickDeleteButton = (e) => {
    e.preventDefault();
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios
        .delete("/used-goods/" + id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          navigate("/market");
        })
        .catch((err) => console.log(err));
    } else {
      alert("취소합니다.");
    }
  };

  // 게시글 삭제 버튼 보여주는 코드
  const showDeleteButton = (e) => {
    if (String(author) === String(market.author)) {
      return (
        <button
          className="market-deleteButton"
          onClick={(e) => onClickDeleteButton(e)}
        >
          | 게시글 삭제 |
        </button>
      );
    }
  };

  // 이전글/다음글
  let a = 1;
  markets.map((marketE) => {
    marketE.marketNo = a;
    if (market.id === marketE.id) {
      market.marketNo = a;
    }
    a = a + 1;
  });

  const postList =
    parseInt(markets.length) <= 5
      ? markets
      : parseInt(market.marketNo) === 1
      ? markets.slice(
          parseInt(market.marketNo) - 1,
          parseInt(market.marketNo) + 4
        )
      : parseInt(market.marketNo) === 2
      ? markets.slice(
          parseInt(market.marketNo) - 2,
          parseInt(market.marketNo) + 3
        )
      : parseInt(market.marketNo) === parseInt(num) - 1
      ? markets.slice(
          parseInt(market.marketNo) - 4,
          parseInt(market.marketNo) + 1
        )
      : parseInt(market.marketNo) === parseInt(num)
      ? markets.slice(
          parseInt(market.marketNo) - 5,
          parseInt(market.marketNo) + 0
        )
      : markets.slice(
          parseInt(market.marketNo) - 3,
          parseInt(market.marketNo) + 2
        );

  // <대댓글 구현>
  const [commentContents, setCommentContents] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [responseTo, setResponseTo] = useState(0);
  const commentPageType = "usedGoods";

  // 댓글, 대댓글 get 해오기
  useEffect(
    (e) => {
      axios
        .get("/used-goods/comments/" + id, {
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
          <span className="sub-title1">중고거래</span>
        </div>
        <div className="line"></div>
        <div className="marketPostView-section1">
          <div>{showDeleteButton()}</div>
          <span className="marketPostView-title">{market.title}</span>
          <span>
            <button className="market-complete-btn">판매 완료</button>
          </span>
          <div className="marketPostView-subtitle">
            <span>{market.date}</span>
            {/* 글 작성자의 아이디*/}
            <span>작성자:{market.author}</span>
          </div>
          <img src={image}></img>
          <div className="marketPostView-content"></div>
        </div>
        <div className="relpy-line"></div>
        <div className="marketPostView-section2">
          <div className="reply-title">댓글</div>
          <div className="reply-id">{market.author}</div>
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
        <div className="pagination-section">
          <div className="pagination-title">이전 글 / 다음 글</div>

          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return parseInt(item.id) === parseInt(market.id) ? (
                    <Link
                      to={`/marketPostView/${item.id}`}
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
                      to={`/marketPostView/${item.id}`}
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

export default MarketPostView;