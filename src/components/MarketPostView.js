import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import "../MarketPostView.css";



const MarketPostView = ({location}) => {
    console.log(location);
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
                    <span className='marketPostView-title'>제목</span>
                    <span>
                        <button className='market-complete-btn'>판매 완료</button>
                    </span>
                    <div className='marketPostView-subtitle'>
                        <span>2021.10.31</span>
                        <span>작성자: 오새별</span>
                    </div>
                    <img className='marketPostView-img' src='../img/test.png'></img>
                    <div className='marketPostView-content'>
                        사이즈 : X <br></br>
                        유아용<br></br>
                        희망 판매 가격 : 13000원<br></br>
                        <br></br>
                        세부 사항 : <br></br>
                        한 번밖에 안 입었는데
                        애기가 너무 금방 커버려서
                        더 이상 못 입게 되었네요 ㅠㅠ<br></br>
                        애기 입히면 정말 귀여워요...ㅎㅎ  
                    </div>
                </div>
                <div className='relpy-line'></div>
                <div className='marketPostView-section2'>
                    <div className='reply-title'>댓글</div>
                    <div className='reply-id'>오새별</div>
                    <textarea className="reply-input"></textarea>
                    <button className='replybtn'>댓글 달기</button>
                </div>
            </div> 
        </div>
    )
}

export default MarketPostView
