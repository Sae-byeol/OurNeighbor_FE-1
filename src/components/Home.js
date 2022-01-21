import Navbar from './Navbar';
import Header from './Header';
import '../Home.css';
import HomeCalendar from './HomeCalendar'
import '../HomeCalendar.css';
import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { asRoughMinutes } from '@fullcalendar/react';

const Home = () => {
    const [notice, setNotice]=useState([]);
    const [events, setEvents]=useState([]);

    useEffect(() => {
        axios.get('dummy/calendar_list.json')
        .then(res=>setEvents(res.data.calendarList))
       .catch(err=>console.log(err));
       }, []);

       
   
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
            <div className="home-section1">
                <div className='welcomeImgBox'>
                    <img className="homeImg1" src="../img/home1.png"></img>
                    <div className="home-welcomeText">
                        미림아파트<br/>김민경님<br/>우리 이웃들을 만나보세요!
                    </div>
                </div>
                <img src="../img/home2.png"></img>
            </div>
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

                    </div>
            </div>

            </div>
        </div>
    )
}

export default Home
