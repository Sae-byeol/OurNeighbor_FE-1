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

const MarketPostView = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [market, setMarket]=useState({});
  const [markets,setMarkets]=useState([]);
  //const markets=props.component;
    const num = markets.length;
 
    useEffect(() => {
      //console.log(localStorage.getItem("accessToken"));
      axios
        .get("/apartments/used-goods", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          //console.log("success");
          setMarkets(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/used-goods/"+id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setMarket(res.data);
        //console.log(res.data);
        //console.log(markets);
        console.log("render"); 
      })
      .catch((err) => console.log(err));
  },[useParams()]);


  const postList =
    parseInt(id) === 1
      ? markets.slice(parseInt(id) - 1, parseInt(id) + 4)
      : parseInt(id) === 2
      ? markets.slice(parseInt(id) - 2, parseInt(id) + 3)
      : parseInt(id) === parseInt(num) - 1
      ? markets.slice(parseInt(id) - 4, parseInt(id) + 1)
      : parseInt(id) === parseInt(num)
      ? markets.slice(parseInt(id) - 5, parseInt(id) + 0)
      : markets.slice(parseInt(id) - 3, parseInt(id) + 2);

      //console.log(postList);
  const matchItem = props.component.find(function (element) {
    if (element.id === Number(id)) return true;
  });

  //대댓글 구현
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
          <span className="marketPostView-title">{market.title}</span>
          <span>
            <button className="market-complete-btn">판매 완료</button>
          </span>
          <div className="marketPostView-subtitle">
            <span>{market.date}</span>
            {/* 글 작성자의 아이디*/}
            <span>작성자:{market.author}</span>
          </div>
          <img className="marketPostView-img" src="../img/test.png"></img>
          <div className="marketPostView-content">
            
          </div>
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
                  return parseInt(item.id) ===
                    parseInt(market.id) ? (
                    <Link
                      to={`/marketPostView/${item.id}`}
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
                      to={`/marketPostView/${item.id}`}
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

export default MarketPostView;