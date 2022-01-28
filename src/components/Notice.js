import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import axios from 'axios';
import Pagination from "react-js-pagination";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../Gathering.css";
import "../GatheringForm.css";
import "../Notice.css"
const Notice = () => {
    const [user, setUser]=useState([]);
    const [notice, setNotice]=useState([
    ]); 
    useEffect(() => {
        axios.get('dummy/notice_list.json')
        .then(res=>setNotice(res.data.noticeList))
       .catch(err=>console.log(err));
        // "/user/info" 같은 로그인한 유저의 개인정보가 저장되어 있는 url에서 get해오기
       axios.get("dummy/member.json")
       .then(res=>{
           console.log(res.data)
           setUser(res.data)
       })
    }, []);
    const addNoticeVisible=()=>{
        if(user.role==="관리자"){
          window.location.href="/noticeAdd";
        }
        else{
          alert("관리자만 공지사항 추가가 가능합니다.");
        }
         
      }
    const [page, setPage] = useState(1);
    
    let a = 1;
    const BeforeonClicksetPage = notice.map((notice) => {
      notice.notice_id = a;
      a++;
      return notice;
    });

    // unfocused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
    const renderNotices = notice.map((notice) => {
      return (
        <div className="gathering-flex">
      <Link
        to={`/noticePostView/${notice.notice_id}`}
        style={{ textDecoration: "none", color: "#000" }}
        >    
        <div className="gatheringForm">
        <div className="gatheringForm-title" style={{ fontSize: "25px" }}>
            {notice.title}
        </div>
        <div className="gatheringForm-cont">{notice.content}</div>
        <div className="gatheringForm-date">{notice.date}</div>
        </div>
        </Link>
      </div>
      );
    });
    const handlePageChange = (page) => {
        setPage(page);
        window.scrollTo(0, 0);
      };
  
  return (
    <div className="App">
        <div className="content">
            <Header></Header>
            <Navbar></Navbar>
            
            <div className='section1'>
            <Link to="/calender" style={{ textDecoration: 'none' }}>
            <span className='sub-title1'>캘린더</span>
            </Link>
            <Link to="/notice" style={{ textDecoration: 'none' }}>
            <span className='sub-title2'>공지사항</span>
            </Link>
            
            </div>
            <div className='line'></div>
            <div className="notice-add-btn-div">
                
                
                <button className='notice-add-btn' onClick={addNoticeVisible}>글 쓰기</button>
                
                
            </div>
           
            <div className="gathering-section2">
                
                        {renderNotices}
                   
                </div>
            </div>
            <div>
                <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={
                    
                    parseInt(BeforeonClicksetPage.length % 7) === 0
                        ? parseInt(BeforeonClicksetPage.length / 7) * 5
                        : (parseInt(BeforeonClicksetPage.length / 7) + 1) * 5
                   
                }
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={
                    
                     handlePageChange
                   
                }
            />
                    
        </div>
    </div>
  )
};

export default Notice;
