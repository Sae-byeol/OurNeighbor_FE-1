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

function App() {
  /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible] = useState(false);
  /*const renderTitles=todayTitle.map((val)=>{
    return(
      <div>{val.todayTitle}</div>
    );
  })*/
  //console.log(todayTitle);

  const [bests, setBests] = useState([]);
  useEffect(() => {
    axios
      .get("dummy/best_list.json")
      .then((res) => setBests(res.data.bestList))
      .catch((err) => console.log(err));
  }, []);

  const [gatherings, setGatherings] = useState([]);
  useEffect(() => {
    axios
      .get("dummy/gathering_list.json")
      .then((res) => setGatherings(res.data.gatheringList))
      .catch((err) => console.log(err));
  }, []);

  const [notice, setNotice] = useState([]);
  const [markets, setMarkets] = useState([]);
  useEffect(() => {
    axios
      .get("dummy/market_list.json")
      .then((res) => setMarkets(res.data.marketList))
      .catch((err) => console.log(err));

    axios
      .get("dummy/notice_list.json")
      .then((res) => setNotice(res.data.noticeList))
      .catch((err) => console.log(err));
  }, []);
  //console.log(markets);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="/editMypage" element={<EditUser></EditUser>}></Route>
        <Route path="/market" element={<Market component={markets}></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/notice" element={<Notice></Notice>}></Route>
        <Route
          path="/postView/:usedGoods_id"
          element={<MarketPostView component={markets}></MarketPostView>}
        ></Route>
        <Route
          path="/noticePostView/:notice_id"
          element={<NoticePostView component={notice}> </NoticePostView>}
        ></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
        <Route path="/signin" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/noticeAdd" element={<NoticeAdd></NoticeAdd>}></Route>
        <Route path="/signin" element={<LoginPage></LoginPage>}></Route>
        <Route path="/signup" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/best" element={<Best component={bests}></Best>}></Route>
        <Route path="/bestAdd" element={<BestAdd></BestAdd>}></Route>
        <Route
          path="/bestPostView/:id"
          element={<BestPostView component={bests}></BestPostView>}
        ></Route>
        <Route
          path="/gathering"
          element={<Gathering component={gatherings}></Gathering>}
        ></Route>
        <Route
          path="/gatheringAdd"
          element={<GatheringAdd></GatheringAdd>}
        ></Route>
        <Route
          path="/gatheringPostView/:id"
          element={
            <GatheringPostView component={gatherings}></GatheringPostView>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
