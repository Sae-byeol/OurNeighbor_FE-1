import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Gathering from "./components/Gathering";
import Best from "./components/Best";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState([
    { title: "event1", date: "2022-01-01" },
    { title: "event1-1", date: "2022-01-01" },
    { title: "event2", date: "2022-01-12" },
  ]);
  /*const renderTitles=todayTitle.map((val)=>{
    return(
      <div>{val.todayTitle}</div>
    );
  })*/
  //console.log(todayTitle);

  const addVisible = () => {
    setVisible(!visible);
    console.log(events);
  };

  const addEvent = (event) => {
    setEvents([...events, event]);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar></Navbar>} exact={true}></Route>
        <Route path="/best" element={<Best></Best>}></Route>
        <Route path="/gathering" element={<Gathering></Gathering>}></Route>
      </Routes>
    </div>
  );
}

export default App;
