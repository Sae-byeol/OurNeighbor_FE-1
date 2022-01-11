import React,{useState} from 'react'
import Navbar from './Navbar';
import Header from './Header';
import '../Market.css';
import MarketForm from './MarketForm';
import {BrowserRouter, Route, Routes,Link} from 'react-router-dom';

const Market = () => {
    const [markets, setMarkets]=useState([
        {title:'흰 블라우스', img:'../img/test.png', no:1 },
        {title:'흰 블라우스', img:'../img/test.png', no:2 },
        {title:'흰 블라우스', img:'../img/test.png', no:3 },
        {title:'흰 블라우스', img:'../img/test.png', no:4 }
    ]
        
    )
    const renderMarkets=markets.map(market=>{
        return (
           
            <MarketForm market={market} key={market.no}></MarketForm>
            
                
            
            
        )
    })
    
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
                <div className='section1'>
                    <span className='sub-title1'>중고거래</span>
                    <span className='section1-right'>
                        <img className='market-search-btn' src='../img/search.png' ></img>
                        <input className='market-input'></input>
                        <Link to="/marketAdd">
                        <button className='market-add-btn'>글 쓰기</button>
                        </Link>
                        
                    </span>
                </div>
                <div className='line'></div>
                <div className='market-section2'>
                    {renderMarkets}
                </div>
            </div>
            
        </div>
    )
}

export default Market;
