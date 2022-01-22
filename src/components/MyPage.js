import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import "../Mypage.css";

const MyPage = () => {
  return (
    <div className='App'>
    <div className='content'>
        <Header></Header>
        <Navbar></Navbar>
        <div className='section1'>
            <span className='sub-title1'>마이페이지</span>
        </div>
        <div className='line'></div>
        <div className='mypage-section2'>
            <div className='mypageForm'>
                <img className="mypage-img" src='../img/profile.png'></img>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>이름</span>
                    <span className='mypage-content-content'>오새별</span>
                </div>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>닉네임</span>
                    <span className='mypage-content-content'>새별</span>
                </div>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>아이디</span>
                    <span className='mypage-content-content'>toquf0424</span>
                </div>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>휴대폰번호</span>
                    <span className='mypage-content-content'>010-5134-0797</span>
                </div>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>아파트</span>
                    <span className='mypage-content-content'>현대아파트</span>
                </div>
                <div className='mypage-content'>
                    <span className='mypage-content-title'>회원 유형</span>
                    <span className='mypage-content-content'>주민</span>
                </div>
                <div className='mypage-edit'>
                    <div className='mypage-editBtn'>ㅣ회원정보 수정하기ㅣ</div>
                </div>
                
            </div>
        </div>
    </div>
    </div>
  )
};

export default MyPage;

