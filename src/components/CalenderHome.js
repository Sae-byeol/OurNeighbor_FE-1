
import '../CalenderHome.css';
import Calender from './Calender';
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import AddEvent from './AddEvent';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';

const CalenderHome = () => {
        /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible]= useState(false);
  const [events, setEvents]=useState([]);
  const [user, setUser]=useState([]);
  useEffect(()=>{
    // "/user/info" 같은 로그인한 유저의 개인정보가 저장되어 있는 url에서 get해오기
    axios.get("dummy/member.json")
    .then(res=>{
        console.log(res.data)
        setUser(res.data)
    })
},[])

  useEffect(() => {
    axios.get('dummy/calendar_list.json')
    .then(res=>setEvents(res.data.calendarList))
   .catch(err=>console.log(err));
   }, []);

  const addVisible=()=>{
    if(user.role==="관리자"){
      setVisible(!visible);
      console.log(events);
      
    }
    else{
      alert("관리자만 일정 추가가 가능합니다.");
    }
     
  }

  const addEvent=(event)=>{
    setEvents(
        [
            ...events,
            event
        ]
    )
}
  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className='section1'>
          <span className='sub-title1'>캘린더</span>
          <span className='sub-title2'>공지사항</span>
        </div>
        <div className='line'></div>
        <div className="section2">
          <div className='calender-edit'>
            {visible
            ? <div></div>
            : <button className='calender-edit-btn' onClick={addVisible}>일정 추가</button>
            }
          
            
          </div>
          <div className='calenderCase'>
          {visible ?<AddEvent addEvent={addEvent} addVisible={addVisible}></AddEvent> : <Calender events={events}></Calender>}
             
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalenderHome
