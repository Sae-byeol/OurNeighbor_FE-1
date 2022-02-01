import React,{useState} from 'react'
import '../Header.css' 
import {BrowserRouter, Route, Routes,Link,Outlet} from 'react-router-dom';
import axios from 'axios';
const Header = () => {
  const [user, setUser]=useState({});
  if(localStorage.getItem("accessToken")){
    axios.get("/member/info", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    }).then((res) => {setUser(res.data);})
}
    return (
        <div className='header'>
          <Link to="/">
          <div className='header-left'>
            <img className='imagelogo' src='../img/imagelogo.png' width="100" height="100"></img>
            <img className='logo' src='../img/logo.png'></img>
          </div>
          </Link>
          <div className='header-right'>
            <div className='header-right-left'>
              <div>나의 쪽지함</div>
              <div>{user.name}</div>
            </div>
            <div className='header-right-right'>
            <Link to="/mypage">
            <img className="profile" src='../img/profile.png'></img>
            </Link>
            </div>
            
          </div>   
        </div>
    )  
}

export default Header
