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
   /*const onSilentRefresh=()=>{
        axios.post('/reissue',{
            accessToken : localStorage.getItem("accessToken"),
            refreshToken: localStorage.getItem("refreshToken")
        })
        .then((res)=>{
          localStorage.setItem("accessToken", res.data.accessToken);
          console.log("suc");
        })
        .catch((err)=>console.log(err));
    }*/
    
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
        
         
        axios.get('dummy/calendar_list.json')
        .then(res=>setEvents(res.data.calendarList))
       .catch(err=>console.log(err));

       axios.get('dummy/notice_list.json')
        .then(res=>{
        setNotice(res.data.noticeList)
        })
         .catch(err=>console.log(err));
         
       axios.get('dummy/market_list.json')
       .then(res=>{
           setNewPost(res.data.marketList)
            const sorted=[...newPost]
            sorted.sort((a,b)=>
            parseInt(a.usedGoods_id)-parseInt(b.usedGoods_id));
            setNewPost(sorted);
       })
        .catch(err=>console.log(err));

        /*axios.get("dummy/best_list.json")
        .then(res=>{
            setNewPost(res.data.bestList)
            //sortNewPost(newPost)
        })
         .catch(err=>console.log(err));
 */
    },[]);    
    
   
    
   
    return (
        <div className='App'>
            <div className='content'>
                <Header user={user}></Header>
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
                        return(
                            <div key={val.index} className='box'>
                            <div className='home-best-map'>
                                <div className='home-best-map-from'>{val.from}</div>
                                <div className='home-best-map-title'>{val.title}</div>
                                {/* date는 toLocaleString() 사용하기*/}
                                <div className='home-notice-map-date'>{val.date}</div>
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
