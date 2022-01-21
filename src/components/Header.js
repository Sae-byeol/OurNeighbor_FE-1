import React from 'react'
import '../Header.css' 
import {BrowserRouter, Route, Routes,Link,Outlet} from 'react-router-dom';
const Header = () => {
    return (
        <div className='header'>
          <Link to="/">
          <div className='header-left'>
            <img className='imagelogo' src='../img/imagelogo.png' width="100" height="100"></img>
            <img className='logo' src='../img/logo.png'></img>
          </div>
          </Link>
          <div className='header-right'>
            <span>오새별님</span>
            <img className="profile" src='../img/profile.png'></img>
          </div>   
        </div>
    )  
}

export default Header
