import React,{useState} from 'react'
import Navbar from './Navbar';
import Header from './Header';
import '../Market.css';
import MarketForm from './MarketForm';
import {BrowserRouter, Route, Routes,Link,Outlet} from 'react-router-dom';
import "../paging.css";
import Pagination from "react-js-pagination";

const Market = (props) => {
    const markets=props.component;
    const [page, setPage] = useState(1);
    const onClicksetPage = markets.filter((market) => {
        return (page - 1) * 9 + 1 <= market.no && market.no <= (page - 1) * 9 + 9;
      });

    const renderMarkets = onClicksetPage.map((market) => {
      window.scrollTo(0, 0);  
      return (
          <div className='market-flex'>
            <MarketForm
              market={market}
              key={market.no}
              title={market.title}
              id={market.id}
            ></MarketForm>
          </div>
        );
      });
      const handlePageChange = (page) => {
        
        setPage(page);
        //onClicksetPage();
        renderMarkets();
        
      };
    
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
                <div className='section1'>
                    <span className='sub-title1'>중고거래</span>
                    <span className='section1-right'>
                        <img className='market-search-btn' src='../img/search.png' ></img>
                        <input className='market-input'></input>
                        <Link to="/marketAdd">
                        <button className='market-add-btn'>글 쓰기</button>
                        </Link>
                        
                    </span>
                </div>
                <div className='line'></div>
                <div className='market-section2'>
                    {renderMarkets}
                </div>
                <div>
                    <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
                    totalItemsCount={
                        parseInt(markets.length % 9) === 0
                        ? parseInt(markets.length / 9) * 5
                        : (parseInt(markets.length / 9) + 1) * 5
                    }
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handlePageChange}
                    />
                </div>
            </div>
            <Outlet></Outlet>
        </div>
    )
}

export default Market;
