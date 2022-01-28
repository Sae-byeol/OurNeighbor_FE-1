import React , {useState}from 'react'
import {BrowserRouter, Route, Routes,Link} from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import '../MarketAdd.css';

const NoticeAdd = () => {
    const [noticeTitle, setNoticeTitle]=useState('');
    const [noticeContent, setNoticeContent]=useState('');
    

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
        <Link to="/notice" style={{ textDecoration: 'none' }}>
            <span className='sub-title1'>공지사항</span>
        </Link>
        </div>
        <div className='line'></div>
        <div className='marketAdd-section2'>
            <form>
                <span className='marketAddTitle'>제목</span>
                <input
                    className='marketAddTitleInput'
                    type="text"
                    value={noticeTitle}
                    onChange={e=>setNoticeTitle(e.target.value)}
                />
                <div className='marketAddContent'>내용</div>
                <textarea
                    className='marketAddTextarea'
                    type="text"
                    placeholder=' 내용'
                    value={noticeContent}
                    onChange={e=>setNoticeContent(e.target.value)}
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
  );
};

export default NoticeAdd;
