import './App.css';
import Calender from './components/Calender';
import React,{useState} from 'react';
import { render } from 'react-dom';
import Add from './components/AddEvent';
import Header from './components/Header';
import Navbar from './components/Navbar';

function App() {
  /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible]= useState(false);
  const [events, setEvents]=useState([
    { title: 'event1', date: '2022-01-01' },
    { title:'event1-1', date:'2022-01-01' },
    { title: 'event2', date: '2022-01-12' }]);
  /*const renderTitles=todayTitle.map((val)=>{
    return(
      <div>{val.todayTitle}</div>
    );
  })*/
  //console.log(todayTitle);
  
  const addVisible=()=>{
      setVisible(!visible);
      console.log(events);
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
          {visible ?<Add addEvent={addEvent} addVisible={addVisible}></Add> : <Calender  events={events}></Calender>}
          </div>
        </div>
      </div>
    </div>
  );
}  

export default App;
