import './App.css';
import Calender from './components/Calender';
import CalenderHome from './components/CalenderHome';
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import Add from './components/AddEvent';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Market from './components/Market';
import MarketAdd from './components/MarketAdd';
import MarketPostView from './components/MarketPostView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';


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
  const [markets, setMarkets]=useState([]);
  useEffect(() => {
   axios.get('dummy/market_list.json')
   .then(res=>setMarkets(res.data.marketList))
   .catch(err=>console.log(err));
  }, []);

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
        <Route path="/market" element={<Market component={markets}></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/postView/:no" element={<MarketPostView component={markets}></MarketPostView>}></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
      </Routes>
    </div>
    
  );
}  

export default App;
