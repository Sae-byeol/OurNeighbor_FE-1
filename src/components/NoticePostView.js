import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {useHistory, useParams ,Outlet} from 'react-router-dom';
import "../GatheringPostView.css";

const NoticePostView = (props) => {
    const {notice_id}=useParams();
    const [value, setValue] = useState("");
    const [commentList, setCommentList] = useState([]);
    

    const notices=props.component;
    const num=notices.length;

    const postList =
    parseInt(notice_id) === 1
      ? notices.slice(parseInt(notice_id) - 1, parseInt(notice_id) + 4)
      : parseInt(notice_id) === 2
      ?  notices.slice(parseInt(notice_id) - 2, parseInt(notice_id) + 3)
      : parseInt(notice_id) === parseInt(num) - 1
      ?  notices.slice(parseInt(notice_id) - 4, parseInt(notice_id) + 1)
      : parseInt(notice_id) === parseInt(num)
      ?  notices.slice(parseInt(notice_id) - 5, parseInt(notice_id) + 0)
      :  notices.slice(parseInt(notice_id) - 3, parseInt(notice_id) + 2);

    const addComment = () => {
        console.log("AddComment");
        setCommentList(commentList.concat([value]));
        setValue("");
    };
    
    const matchItem=props.component.find(function(element){
       if (element.notice_id===Number(notice_id))
       return true;
    })
  return ( 
  <div className="App">
  <div className='content'>
      <Header></Header>
      <Navbar></Navbar>
      <div className='section1'>
          <Link to="/notice" style={{ textDecoration: 'none' }}>
            <span className='sub-title1'>공지사항</span>
          </Link>
      </div>
      <div className='line'></div>

      <div className='marketPostView-section1'>
          <span className='marketPostView-title'>{matchItem.title}</span>
          <div className='marketPostView-subtitle'>
              <span>{matchItem.date}</span>
              
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
          <div className='reply-id'>{matchItem.member_id}</div>
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
      
          {postList
              ? postList.map((item, index) => {
                  return parseInt(item.notice_id) ===parseInt(matchItem.notice_id) 
                  ? ( <Link
                          to={`/noticePostView/${item.notice_id}`}
                          style={{ textDecoration: "none", color: "#ffa800" }}
                          onClick={window.scrollTo(0, 0)}
                          >
                      <div className="postlist" key={index}>
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-date">{item.date}</div>
                      </div>                                
                  </Link>) 
                  : ( <Link
                          to={`/noticePostView/${item.notice_id}`}
                          style={{ textDecoration: "none", color: "#443333" }}
                          onClick={window.scrollTo(0, 0)}
                          >
                      <div className="postlist" key={index}>
                      <div className="postlist-title">{item.title}</div>
                      <div className="postlist-date">{item.date}</div>
                      </div>                       
                      </Link>);
                  })
              : ""}
</div>
  </div> 
</div>
</div>)
};

export default NoticePostView;
