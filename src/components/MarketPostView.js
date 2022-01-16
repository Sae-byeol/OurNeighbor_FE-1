import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import "../MarketPostView.css";
import {useHistory, useParams ,Outlet} from 'react-router-dom';
import markets from "./Market";


const MarketPostView = (props) => {
    const {usedGoods_id}=useParams();
    
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
                    <textarea className="reply-input"></textarea>
                    <button className='replybtn'>댓글 달기</button>
                </div>
            </div> 
            
        </div>
    )
}

export default MarketPostView
