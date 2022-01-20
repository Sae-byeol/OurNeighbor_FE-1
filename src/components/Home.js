import React from 'react'
import Navbar from './Navbar';
import Header from './Header';
import '../Home.css';
import HomeCalendar from './HomeCalendar'
import '../HomeCalendar.css';

const Home = () => {
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
                    <HomeCalendar></HomeCalendar>
                </div>
            </div>
            <div className='home-section2-2'>


            </div>
            </div>
        </div>
    )
}

export default Home
