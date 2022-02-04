import React, { useState , useEffect} from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import "../Market.css";
import MarketForm from "./MarketForm";
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import "../Paging.css";
import Pagination from "react-js-pagination";
import axios from 'axios';

const Market = (props) => {
  const [markets, setMarkets]=useState([]);
  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/apartments/used-goods", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //console.log("success");
        setMarkets(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [page, setPage] = useState(1);
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

  const onClicksetPage = BeforeonClicksetPage.filter((market) => {
    return (
      (page - 1) * 9 + 1 <= market.usedGoods_id &&
      market.usedGoods_id <= (page - 1) * 9 + 9
    );
  });

  const handlePageChange = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  const renderMarkets = onClicksetPage.map((market) => {
    window.scrollTo(0, 0);
    return (
      <div className="market-flex">
        <MarketForm
          market={market}
          key={market.id}
          title={market.title}
          id={market.id}
        ></MarketForm>
      </div>
    );
  });
  /* const handlePageChange = (page) => {
        setPage(page);
        renderMarkets();
      };*/

  return (
    <div className="App">
      <div className="content">
        <Header></Header>
        <Navbar></Navbar>
        <div className="section1">
          <span className="sub-title1">중고거래</span>
          <span className="section1-right">
            <img className="market-search-btn" src="../img/search.png"></img>
            <input
              className="market-input"
              placeholder="제목 / 내용 검색"
              value={searchingText}
              onChange={(e) => {
                setSearchingText(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  searchSpace(e.target.value);
                }
              }}
            ></input>
            <Link to="/marketAdd">
              <button className="market-add-btn">글 쓰기</button>
            </Link>
          </span>
        </div>
        <div className="line"></div>
        <div className="market-mid">
          <div className="market-middle">
            <div className="market-section2">{renderMarkets}</div>
          </div>
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
    </div>
  );
};

export default Market;
