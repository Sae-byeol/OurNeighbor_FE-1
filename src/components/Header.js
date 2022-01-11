import React from 'react'
import '../Header.css' 

const Header = () => {
    return (
        <div className='header'>
          <div className='header-left'>
            <img className='imagelogo' src='../img/imagelogo.png' width="100" height="100"></img>
            <img className='logo' src='../img/logo.png'></img>
          </div>
          <div className='header-right'>
            <span>오새별님</span>
            <img className="profile" src='../img/profile.png'></img>
          </div>   
        </div>
    )  
}

export default Header
