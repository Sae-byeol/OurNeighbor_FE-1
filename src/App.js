import './App.css';
import Calender from './components/Calender';
import CalenderHome from './components/CalenderHome';
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import Add from './components/AddEvent';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Market from './components/Market';
import MarketAdd from './components/MarketAdd';
import MarketPostView from './components/MarketPostView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';


function App() {
  /*const [todayTitle, setTodayTitle]=useState('일정1');
  const [date, setDate]=useState('날짜');*/
  const [visible, setVisible]= useState(false);
  
  
  const [markets, setMarkets]=useState([]);
  useEffect(() => {
   axios.get('dummy/market_list.json')
   .then(res=>setMarkets(res.data.marketList))
   .catch(err=>console.log(err));
  }, []);
//console.log(markets);

  return (
    <div className="App">
      <Routes>
        {/*<Route path="/" element={<Navbar></Navbar>}></Route>*/}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/market" element={<Market component={markets}></Market>} />
        <Route path="/calender" element={<CalenderHome></CalenderHome>}></Route>
        <Route path="/postView/:usedGoods_id" element={<MarketPostView component={markets}></MarketPostView>}></Route>
        <Route path="/marketAdd" element={<MarketAdd></MarketAdd>}></Route>
      </Routes>
    </div>
    
  );
}  

export default App;
