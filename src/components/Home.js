import Navbar from './Navbar';
import Header from './Header';
import '../Home.css';
import HomeCalendar from './HomeCalendar'
import '../HomeCalendar.css';
import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { asRoughMinutes, sliceEvents } from '@fullcalendar/react';
import {BrowserRouter, Route, Routes,Link,Outlet} from 'react-router-dom';

//useEffect 실행 순서 때문에 App.js에서 notice배열 먼저 get 다 끝내고 props로 여기로 넘겨줘서 사용하는 방식으로 구현함

const Home = () => {
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    const [user, setUser]=useState({});
    const [notice, setNotice]=useState([
    ]); 
    const [newPost, setNewPost]=useState([
    ])
    const [events, setEvents]=useState([]);
    
    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            setIsLoggedIn(true);
            //setTimeout(onSilentRefresh,  1800000-1740000 );
            axios.get("/member/info", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {setUser(res.data);})
        }
        axios
        .get("/apartment/schedules", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => console.log(err));
        axios.get("/apartments/notices", {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {setNotice(res.data);})
        axios.get("/apartments/latest-post",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {console.log(res.data); setNewPost(res.data.reverse());})
     
    },[]);    
    
   
    
   
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
            <div className="home-section1">
                <div className='welcomeImgBox'>
                    <img className="homeImg1" src="../img/home1.png"></img>
                    { isLoggedIn 
                    ? <div className="home-welcomeText">
                        {user.apartName}<br/>{user.name}<br/>우리 이웃들을 만나보세요!
                      </div>
                    : 
                   
                    <div className="home-welcomeText">
                    로그인 후 <br/> 우리 이웃을 만나보세요!
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                    <div className='home-welcomeLogin'>ㅣ로그인ㅣ</div> 
                    </Link>
                    </div>

                    }
                </div>
                <img src="../img/home2.png"></img>
            </div>
            { isLoggedIn ?
            <div>
            <div className='home-section2-1'>
                <span className='home-calendarText'>이번 달에는 아파트에 무슨 일정이 잡혀 있을까요?<br/>이번 달의 일정을 확인하세요!</span>
                <img src='../img/check.png'></img>
                <div className='home-calendar'>
                    <HomeCalendar events={events}></HomeCalendar>
                </div>
            </div>
            <div className='home-section2-2'>
                    <img className='home-NoticeImg' src="../img/home3.png"></img>
                    <span className='home-NoticeText'>관리사무소에서 알립니다!<br/>이번 달의 공지사항을 확인하세요!</span>
                    <div className='home-notice'>
                    {notice.map((val)=>{
                        return(
                            <div key={val.index} className='box'>
                             <div className='home-notice-map'>
                            <div className='home-notice-map-title'>{val.title}</div>
                            <div className='home-notice-map-date'>{new Date(val.date).toLocaleDateString()}</div>
                        </div>
                        </div>
                        )
                    })}
                           
                        
                       
                    </div>
            </div>
            <div className='home-section3'>
                <div className='home-best-title'>최신 추천글</div>
                <div className='home-best'>
                    {newPost.map((val)=>{
                        if (val.postType==="usedGoods"){
                            val.postType="중고거래"
                        }
                        if (val.postType==="recommendPost"){
                            val.postType="추천게시판"
                        }
                        if (val.postType==="gathering"){
                            val.postType="모임모집게시판"
                        }
                        var date=val.createdDate.substr(0,10);
                        var time=val.createdDate.substr(11,12).split(":")
                        return(
                            <div key={val.id} className='box'>
                            <div className='home-best-map'>
                               
                                <div className='home-best-map-from'>{val.postType}</div>
                                <div className='home-best-map-title'>{val.title}</div>
                                {/* date는 toLocaleString() 사용하기*/}
                                <div className='home-notice-map-date'>{date+" "+time[0]+":"+time[1]}</div>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            </div>
            : <div/>}
            </div>
        </div>
    )
}

export default Home
