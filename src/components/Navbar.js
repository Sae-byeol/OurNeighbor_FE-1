import React from 'react'
import '../Navbar.css'
const Navbar = () => {
    return (
        <div className='navdiv'>
          <ul className='nav'>
              <li className='nav-list'>추천 게시판</li>
              <li className='nav-list'>중고거래</li>
              <li className='nav-list'>모임/모집 게시판</li>
              <li className='nav-list'>캘린더/공지사항</li>
          </ul>
        </div>
    )
}

export default Navbar
