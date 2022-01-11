import React from 'react'
import '../Navbar.css'
import {Link} from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='navdiv'>
          <ul className='nav'>
              <li className='nav-list'>추천 게시판</li>
              <Link to="/market"><li className='nav-list'>중고거래</li></Link>
              <li className='nav-list'>모임/모집 게시판</li>
              <Link to="/calender"><li className='nav-list'>캘린더/공지사항</li></Link>
    
          </ul>
        </div>
    )
}

export default Navbar;
