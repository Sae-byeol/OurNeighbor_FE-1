import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import "../MarketPostView.css";
import "../PostList.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {useHistory, useParams ,Outlet} from 'react-router-dom';
import markets from "./Market";

const MarketPostView = (props) => {
    const {usedGoods_id}=useParams();
    const [value, setValue] = useState("");
    const [commentList, setCommentList] = useState([]);

    const markets=props.component;
    const num=markets.length;

    const postList =
    parseInt(usedGoods_id) === 1
      ? markets.slice(parseInt(usedGoods_id) - 1, parseInt(usedGoods_id) + 4)
      : parseInt(usedGoods_id) === 2
      ? markets.slice(parseInt(usedGoods_id) - 2, parseInt(usedGoods_id) + 3)
      : parseInt(usedGoods_id) === parseInt(num) - 1
      ? markets.slice(parseInt(usedGoods_id) - 4, parseInt(usedGoods_id) + 1)
      : parseInt(usedGoods_id) === parseInt(num)
      ? markets.slice(parseInt(usedGoods_id) - 5, parseInt(usedGoods_id) + 0)
      : markets.slice(parseInt(usedGoods_id) - 3, parseInt(usedGoods_id) + 2);

    const addComment = () => {
        console.log("AddComment");
        setCommentList(commentList.concat([value]));
        setValue("");
    };
    
    const matchItem=props.component.find(function(element){
       if (element.usedGoods_id===Number(usedGoods_id))
       return true;
    })
    
    return (
        <div className="App">
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
                <div className='section1'>
                    <span className='sub-title1'>중고거래</span>
                </div>
                <div className='line'></div>

                <div className='marketPostView-section1'>
                    <span className='marketPostView-title'>{matchItem.title}</span>
                    <span>
                        <button className='market-complete-btn'>판매 완료</button>
                    </span>
                    <div className='marketPostView-subtitle'>
                        <span>{matchItem.date}</span>
                        <span>작성자:{matchItem.member_id}</span>
                    </div>
                    <img className='marketPostView-img' src='../img/test.png'></img>
                    <div className='marketPostView-content'>
                        {matchItem.content.split("\n").map((line)=>{
                            return (
                                <span>
                                    {line}
                                    <br/>
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className='relpy-line'></div>
                <div className='marketPostView-section2'>
                    <div className='reply-title'>댓글</div>
                    <div className='reply-id'>오새별</div>
                    <textarea className="reply-input" 
                    onChange={(e) => setValue(e.target.value)}
                    type="text"
                    value={value}></textarea>
                    <div className="outreplybtn">
                        <button className='replybtn' onClick={addComment}>댓글 달기</button>
                    </div>
                    <div>
                        {commentList.map((comment) =>
                            comment.length > 65 
                            ? (<div className="reply-comment">
                                    <div className="reply-polygon">
                                    <img src="../img/polygon.png" alt="polygon"></img>
                                    </div>
                                    <div className="reply-eachcomment">
                                    <span>{comment}</span>
                                    </div>
                                    <span>&nbsp;&nbsp;reply-id</span>
                                </div>) 
                            : ( <div className="reply-comment">
                                    <div className="reply-polygon">
                                    <img src="../img/polygon.png" alt="polygon"></img>
                                    </div>
                                    <span className="reply-eachcomment">
                                    <span>{comment}</span>
                                    </span>
                                    <span>&nbsp;&nbsp;reply-id</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='pagination-line'></div>
                <div className="pagination-section">
                <div className="pagination-title">이전 글 / 다음 글</div>
                
                <div className="pagination-pages">
                <div className='pagination-title-line'></div>
                    {postList
                        ? postList.map((item, index) => {
                            return parseInt(item.usedGoods_id) ===parseInt(matchItem.usedGoods_id) 
                            ? ( <Link
                                    to={`/PostView/${item.usedGoods_id}`}
                                    style={{ textDecoration: "none", color: "#ffa800" }}
                                    onClick={window.scrollTo(0, 0)}
                                    >
                                <div className="postlist" key={index}>
                                <div className="postlist-title">{item.title}</div>
                                <div className="postlist-date">{item.date}</div>
                                </div>
                                <div className='pagination-title-line'></div>
                            </Link>) 
                            : ( <Link
                                    to={`/PostView/${item.usedGoods_id}`}
                                    style={{ textDecoration: "none", color: "#443333" }}
                                    onClick={window.scrollTo(0, 0)}
                                    >
                                <div className="postlist" key={index}>
                                <div className="postlist-title">{item.title}</div>
                                <div className="postlist-date">{item.date}</div>
                                </div>
                                <div className='pagination-title-line'></div>
                                </Link>);
                            })
                        : ""}
          </div>
            </div> 
        </div>
        </div>
    )
}

export default MarketPostView
