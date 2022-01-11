import React , {useState}from 'react'
import {BrowserRouter, Route, Routes,Link} from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import '../MarketAdd.css';

const MarketAdd = () => {
    const [marketTitle, setMarketTitle]=useState('');
    const [marketContent, setMarketContent]=useState('');
    

    const onImgChange=async(event)=>{
        const formData=new FormData();
        formData.append('file', event.target.files[0]);
        //서버 통신 필요
    }
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
                <div className='section1'>
                    <span className='sub-title1'>중고거래</span>
                </div>
                <div className='line'></div>
                <div className='marketAdd-section2'>
                    <form>
                        <span className='marketAddTitle'>제목</span>
                        <input
                            className='marketAddTitleInput'
                            type="text"
                            value={marketTitle}
                            onChange={e=>setMarketTitle(e.target.value)}
                        />
                        <div className='marketAddContent'>세부사항</div>
                        <textarea
                            className='marketAddTextarea'
                            type="text"
                            placeholder=' 판매 용품 명
                            S / M / L / XL 등
                            유아용 / 아동용 / 청소년용 / 여성용 / 남성용 등
                            희망 판매 가격'
                            value={marketContent}
                            onChange={e=>setMarketContent(e.target.value)}
                        />
                        <input type='file'
                        className='imgInput'
                        id='marketImg'
                        accept='image/*'
                        name='file'
                        onChangeCapture={onImgChange}>
                        </input>
                        <button className='marketAddCompleteBtn'>작성 완료</button>
                    </form>
                </div>
            </div> 
        </div>
    )
}

export default MarketAdd
