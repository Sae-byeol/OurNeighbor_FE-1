import "./App.css";
import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Gathering from "./components/Gathering";
import GatheringPostView from "./components/GatheringPostView";
import GatheringAdd from "./components/GatheringAdd";
import Best from "./components/Best";
import BestPostView from "./components/BestPostView";
import BestAdd from "./components/BestAdd";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Calender from "./components/Calender";
import Notice from "./components/Notice";
import CalenderHome from "./components/CalenderHome";
import Add from "./components/AddEvent";
import Header from "./components/Header";
import Home from "./components/Home";
import Market from "./components/Market";
import MarketAdd from "./components/MarketAdd";
import MarketPostView from "./components/MarketPostView";
import MyPage from "./components/MyPage";
import EditUser from "./components/EditUser";
import NoticePostView from "./components/NoticePostView";
import NoticeAdd from "./components/NoticeAdd";
import { Component } from "@fullcalendar/core";

function App() {
 
  const [notice, setNotice] = useState([]);

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="/editMypage" element={<EditUser></EditUser>}></Route>
        <Route path="/market" element={<Market></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/notice" element={<Notice></Notice>}></Route>
        <Route
          path="/marketPostView/:id"
          element={<MarketPostView></MarketPostView>}
        ></Route>
        <Route
          path="/noticePostView/:id"
          element={<NoticePostView component={notice}> </NoticePostView>}
        ></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
        <Route path="/signin" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/noticeAdd" element={<NoticeAdd></NoticeAdd>}></Route>
        <Route path="/signin" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/best" element={<Best></Best>}></Route>
        <Route path="/bestAdd" element={<BestAdd></BestAdd>}></Route>
        <Route
          path="/bestPostView/:id"
          element={<BestPostView></BestPostView>}
        ></Route>
        <Route path="/gathering" element={<Gathering></Gathering>}></Route>
        <Route
          path="/gatheringAdd"
          element={<GatheringAdd></GatheringAdd>}
        ></Route>
        <Route
          path="/gatheringPostView/:id"
          element={<GatheringPostView></GatheringPostView>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
