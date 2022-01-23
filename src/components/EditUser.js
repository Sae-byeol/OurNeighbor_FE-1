import React,{useState,useCallback} from 'react';
import Navbar from './Navbar';
import Header from './Header';
import { useParams ,Outlet, useLocation} from 'react-router-dom';

const EditUser = () => {
    const user=useLocation().state.user;
    console.log(user);

    const id=user.loginId;
    const name=user.name;
    const nickname=user.nickName;
    const pw=user.password;
    const email=user.email;
    const apart=user.apart_id;
    const role=user.role;

    const [newId, setNewId]=useState(id);
    const [newName, setNewName]=useState(name);
    const [newNickName, setNewNickName]=useState(nickname);
    const [newPw, setNewPw]=useState(pw);
    const [newEmail, setNewEmail]=useState(email);
    const [newApart, setNewApart]=useState(apart);

    const newUser={
        id:newId,
        name:newName,
        nickName:newNickName,
        password:newPw,
        email:newEmail,
        apart_id:newApart
    }

    const changeId=useCallback(
        (e)=>{
            setNewId(e.target.value);
        },[]
    );
    const changeName=useCallback(
        (e)=>{
            setNewName(e.target.value);
        },[]
    );
    const changeNickName=useCallback(
        (e)=>{
            setNewNickName(e.target.value);
        },[]
    );
    const changePw=useCallback(
        (e)=>{
            setNewPw(e.target.value);
        },[]
    );
    const changeApart=useCallback(
        (e)=>{
            setNewApart(e.target.value);
        },[]
    );

  return (
    <div className='App'>
        <div className='content'>
            <Header></Header>
            <Navbar></Navbar>
            <div className='section1'>
                <span className='sub-title1'>회원정보 수정</span>
            </div>
            <div className='line'></div>
            <div className='mypage-section2'>
                <div className='mypageForm'>
                    <img className="mypage-img" src='../img/profile.png'></img>
                    <div className='mypage-content'>
                        <span className='mypage-content-title'>이름</span>
                        <input className='edit-user' placeholder={name} onChange={changeName}></input>
                    </div>
                    <div className='mypage-content'>
                        <span className='mypage-content-title'>닉네임</span>
                        <input className='edit-user' placeholder={nickname} onChange={changeNickName}></input>
                    </div>
                    <div className='mypage-content'>
                        <span className='mypage-content-title'>아이디</span>
                        <input className='edit-user' placeholder={id} onChange={changeId}></input>
                    </div>
                    <div className='mypage-content'>
                        <span className='mypage-content-title'>비밀번호</span>
                        <input className='edit-user' placeholder={pw} onChange={changePw}></input>
                    </div>
                    <div className='mypage-content'>
                        <span className='mypage-content-title'>아파트</span>
                        <input className='edit-user' placeholder={apart} onChange={changeApart}></input>
                    </div>
                    
                    <div className='mypage-edit'>
                        <div className='editpage-editBtn'>ㅣ수정 내용 저장하기ㅣ</div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
};

export default EditUser;
