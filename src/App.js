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
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible]= useState(false);
  const [events, setEvents]=useState([
    { title: 'event1', date: '2022-01-01' },
    { title:'event1-1', date:'2022-01-01' },
    { title: 'event2', date: '2022-01-12' }]);
  const [markets, setMarkets]=useState([
    {title:'흰 블라우스1', user:'오새별', date:'2021.10.31', content:'사이즈 S\n유아용\n귀여워요\n', img:'../img/test.png', no:1 },
    {title:'흰 블라우스2', user:'오새별',date:'2021.10.31', content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:2 },
    {title:'흰 블라우스3',user:'오새별',  date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:3 },
    {title:'흰 블라우스4', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:4 },
    {title:'흰 블라우스5', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:5 },
    {title:'흰 블라우스6', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:6 },
    {title:'흰 블라우스7', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:7 },
    {title:'흰 블라우스8', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:8 },
    {title:'흰 블라우스9', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:9 },
    {title:'흰 블라우스10', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:10 },
    {title:'흰 블라우스11',user:'오새별',  date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:11},
    {title:'흰 블라우스12', user:'오새별', date:'2021.10.31',content:'사이즈 S\n유아용\n귀여워요\n',img:'../img/test.png', no:12},
  ])
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
        <Route path="/market" element={<Market component={markets}></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/postView/:no" element={<MarketPostView component={markets}></MarketPostView>}></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
      </Routes>
    </div>
    
  );
}  

export default App;
