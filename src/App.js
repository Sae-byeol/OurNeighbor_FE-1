import './App.css';
import Calender from './components/Calender';
import CalenderHome from './components/CalenderHome';
import React,{useState} from 'react';
import { render } from 'react-dom';
import Add from './components/AddEvent';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Market from './components/Market';
import MarketAdd from './components/MarketAdd';
import MarketPostView from './components/MarketPostView';
import {BrowserRouter, Route, Routes,Link} from 'react-router-dom';


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
      <Routes>
        <Route path="/" element={<Navbar></Navbar>}></Route>
        <Route path="/market" element={<Market></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/postView" element={<MarketPostView></MarketPostView>}></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
      </Routes>
    
    </div>
    
  );
}  

export default App;
