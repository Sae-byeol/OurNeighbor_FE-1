import React from 'react'
import '../MarketForm.css'

import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";

const MarketForm = (props) => {
    
    return (
        <Link to={`/postView/${props.market.no}`}>
        <div className='marketForm'>
            <div className='marketForm-title'>{props.market.title}</div>
            <img className="marketForm-img" src={props.market.img}></img>
        </div>
        </Link>
        
    )
}

export default MarketForm
