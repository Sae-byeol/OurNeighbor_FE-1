import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../MarketPostView.css";
import { useHistory, useParams, Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "../PostList.css";
import ParentComment from "./ParentComment";
import axios from "axios";
import ChildComponent from "./ChildComponent";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MarketPostView = () => {
  const { id } = useParams();
  const [market, setMarket] = useState([]);
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
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get("/used-goods/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(async (res) => {
        console.log(res.data);
        setMarket(res.data);
        let s = [];
        if (res.data && res.data.photoId.length !== 0) {
          let w = res.data.photoId.length;
          for (let i = 0; i < res.data.photoId.length; i++) {
            axios({
              method: "GET",
              url: "/photo/" + String(res.data.photoId[i]),
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
              .then((res) => {
                console.log(res.data);
                s.push(
                  window.URL.createObjectURL(
                    new Blob([res.data], {
                      type: res.headers["content-type"],
                    })
                  )
                );
                if (w === s.length) {
                  setImages(s);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  // 이미지 보여주는 코드
  const showImages = (images !== undefined ? images : [1]).map((element) => {
    return (
      <div>
        <img className="postView-img" src={element}></img>
      </div>
    );
  });

  console.log(showImages);

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
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 판매 완료 버튼 보여주기 여부 결정 관련 함수
  console.log(String(author));
  console.log(String(market.author));
  console.log(String(author) === String(market.author));
  const showNickName = (e) => {
    if (String(author) === String(market.author)) {
      return (
        <button
          className="marketPostView-button"
          onClick={(e) => onClickButton(e)}
        >
          판매 완료
        </button>
      );
    }
  };

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.accessToken}`;

  // 판매 완료 버튼 누르면 실행되는 함수
  const onClickButton = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "판매 완료 처리가 되었습니다.",
    });
    axios
      .put("/used-goods/complete/" + id, { complete: true })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    navigate("/market");
  };

  // 게시글 삭제 버튼 누를 때 실행
  const onClickDeleteButton = (e) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "게시글을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니요",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/used-goods/" + id, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "삭제되었습니다.",
              });
              navigate("/market");
              // < 이미지 삭제 >
              // console.log(parseInt(best.photoIds[0]));
              // for (let i = parseInt(best.photoIds[0]); i < best.photoIds.length; i++) {
              //   console.log(i);
              //   axios
              //     .delete("/photo/" + String(i), {
              //       headers: {
              //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              //       },
              //     })
              //     .then((res) => {
              //       alert("사진도 삭제되었습니다.");
              //       navigate("/best");
              //     })
              //     .catch((err) => console.log(err));
              // }
            })
            .catch((err) => console.log(err));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "취소합니다.",
          });
        }
      });
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
  useEffect(() => {
    axios
      .get("/used-goods/comments/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // commentList 초기화 및 get 해온 댓글, 대댓글 추가
        if (commentList.length === 0) {
          setCommentList(commentList.concat(res.data));
        }
      })
      .catch((err) => console.log(err));
  }, [useParams()]);

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
      Swal.fire({
        icon: "warning",
        title: "내용을 입력해주세요",
      });
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

  const onPaginationClick = (e) => {
    window.scrollTo(0, 0);
    setImages([]);
    setCommentList([]);
    console.log(images);
    axios
      .get("/used-goods/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // commentList 초기화 및 get 해온 댓글, 대댓글 추가
        if (commentList.length === 0) {
          setCommentList(commentList.concat(res.data));
        }
      })
      .catch((err) => console.log(err));
  };

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
          <div className="marketPostView-subtitle">
            <span>{String(market.createdDate).substr(0, 10) + "  "}</span>
            <span>
              {String(market.createdDate).substr(11, 12).split(":")[0] +
                ":" +
                String(market.createdDate).substr(11, 12).split(":")[1] +
                " / "}
            </span>
            <span>작성자: {market.author}</span>
          </div>
          <div>{showNickName()}</div>
          <div style={{ width: "30px", height: "20px" }}></div>
          {images !== undefined ? showImages : null}
          <div style={{ width: "30px", height: "20px" }}></div>
          <div className="marketPostView-content">
            {String(market.content)
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
        <div className="pagination">
          <div className="pagination-title">이전 글 / 다음 글</div>
          <div className="pagination-pages">
            {postList
              ? postList.map((item, index) => {
                  return parseInt(item.id) === parseInt(market.id) ? (
                    <Link
                      to={`/marketPostView/${item.id}`}
                      style={{ textDecoration: "none", color: "#ffa800" }}
                      onClick={(e) => onPaginationClick(e)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">
                          {String(item.createdDate).substr(0, 10)}
                          <span>
                            &nbsp;
                            {String(market.createdDate)
                              .substr(11, 12)
                              .split(":")[0] +
                              ":" +
                              String(market.createdDate)
                                .substr(11, 12)
                                .split(":")[1]}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/marketPostView/${item.id}`}
                      style={{ textDecoration: "none", color: "#443333" }}
                      onClick={(e) => onPaginationClick(e)}
                    >
                      <div className="postlist" key={index}>
                        <div className="postlist-title">{item.title}</div>
                        <div className="postlist-date">
                          {String(item.createdDate).substr(0, 10)}
                          <span>
                            &nbsp;
                            {String(market.createdDate)
                              .substr(11, 12)
                              .split(":")[0] +
                              ":" +
                              String(market.createdDate)
                                .substr(11, 12)
                                .split(":")[1]}
                          </span>
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