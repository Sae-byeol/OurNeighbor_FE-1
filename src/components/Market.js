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
    const [renderPage, setRenderPage] = useState("unfocused");
   // const onClicksetPage = markets.filter((market) => {
   //     return (page - 1) * 9 + 1 <= market.usedGoods_id && market.usedGoods_id <= (page - 1) * 9 + 9;
   //   });
   const [buttonColor, setButtonColor] = useState("all");
   const [getName, setGetName] = useState("");
   const [search, setSearch] = useState(null);
   const [searchingText, setSearchingText] = useState(null);
 
   const searchSpace = (e) => {
     setSearch(e);
   };
 
   const searchedMarkets = markets.filter((market) => {
     if (search === "") return market;
     if (search === null) return market;
     else if (
      market.title.toLowerCase().includes(search.toLowerCase()) ||
      market.content.toLowerCase().includes(search.toLowerCase())
     ) {
       return market;
     }
   });
 
   // 초기에는 unfocused 상태
   // focused 상태였다가 unfocused 상태가 다시 될 때 bestNo 값 다시 지정
   let a = 1;
   const BeforeonClicksetPage = searchedMarkets.map((market) => {
    market.usedGoods_id = a;
     a++;
     return market;
   });
 
   // unfocused 상태일 때 각 페이지에 보여줄 객체들 필터
   const onClicksetPage = BeforeonClicksetPage.filter((market) => {
     return (
       (page - 1) * 9 + 1 <= market.usedGoods_id && market.usedGoods_id<= (page - 1) * 9 + 9
     );
   });
 
   // unfocused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
 
   // unfocused 상태일 때
   // 처음에 보여주는 페이지는 1 페이지
   // focused -> unfocused 되기
   // 위의 함수들 실행
   const onBlurButton = () => {
     setPage(1);
     setRenderPage("unfocused");
     BeforeonClicksetPage();
     onClicksetPage();
     renderMarkets();
     return null;
   };
 
   // 버튼을 클릭했을 때
   // unfocusesd -> focused
   // 버튼의 name 가져온다
   const onClickButtonGetName = (e) => {
     let getName = "";
     setRenderPage("focused");
     return setGetName(getName.concat(e));
   };
 
   // name과 케테고리가 일치하는 것만 필터링
   const onClickButtonClassify = searchedMarkets.filter((market) => {
     //return be.category === getName;
   });
 
   // bestNo 값 재지정
   let i = 1;
   const onClickButtonSetForm = onClickButtonClassify.map((market) => {
    market.usedGoods_id = i;
     i++;
     return market;
   });
 
   // bestNo 값에 따라 페이지별로 보여줄 객체들 필터링
   const onClickButtonsetPage = onClickButtonSetForm.filter((market) => {
     return (
       (page - 1) * 9 + 1 <= market.usedGoods_id && market.usedGoods_id  <= (page - 1) * 9 + 9
     );
   });
 
   // focused 상태일 때 보여줄 객체들 BestForm 형태로 나타내기
   const onClickButtonrenderMarkets = onClickButtonsetPage.map((market) => {
     return (
       <div className="best-flex">
         <MarketForm
           market={market}
           key={market.usedGoods_id}
           title={market.title}
           id={market.usedGoods_id}
         ></MarketForm>
       </div>
     );
   });
 
   // 버튼 클릭하면
   // 위 함수들 실행
   // 처음에 보옂는 페이지는 1 페이지
   const onClickButton = (e) => {
     setPage(1);
     onClickButtonGetName(e);
     onClickButtonClassify();
     onClickButtonSetForm();
     onClickButtonsetPage();
     return null;
   };
 
   const handlePageChange = (page) => {
     setRenderPage("unfocused");
     setPage(page);
     window.scrollTo(0, 0);
   };
 
   const FocusedHandlePageChange = (page) => {
     setRenderPage("focused");
     setPage(page);
     window.scrollTo(0, 0);
   };

    const renderMarkets = onClicksetPage.map((market) => {
      window.scrollTo(0, 0);  
      return (
          <div className='market-flex'>
            <MarketForm
              market={market}
              key={market.usedGoods_id}
              title={market.title}
              id={market.usedGoods_id}
            ></MarketForm>
          </div>
        );
      });
     /* const handlePageChange = (page) => {
        setPage(page);
        renderMarkets();
      };*/
    
    return (
        <div className='App'>
            <div className='content'>
                <Header></Header>
                <Navbar></Navbar>
                <div className='section1'>
                    <span className='sub-title1'>중고거래</span>
                    <span className='section1-right'>
                        <img className='market-search-btn' src='../img/search.png' ></img>
                        <input className='market-input'
                          placeholder="제목 / 내용 검색"
                          value={searchingText}
                          onChange={(e) => {
                            setSearchingText(e.target.value);
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              searchSpace(e.target.value);
                            }
                          }}>

                        </input>
                        <Link to="/marketAdd">
                        <button className='market-add-btn'>글 쓰기</button>
                        </Link>
                        
                    </span>
                </div>
                <div className='line'></div>
                <div className='market-section2'>
                {renderPage === "unfocused" ? renderMarkets : onClickButtonrenderMarkets}
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