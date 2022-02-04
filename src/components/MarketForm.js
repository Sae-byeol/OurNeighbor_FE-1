import React from 'react'
import '../MarketForm.css'

import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";

const MarketForm = (props) => {
    
    return (
        <Link to={`/marketPostView/${props.market.id}`} style={{ textDecoration: 'none' }}>
        <div className='marketForm'>
            <div className='marketForm-title'>{props.market.title}</div>
            <img className="marketForm-img" src={props.market.picture}></img>
        </div>
        </Link>
        
    )
}

export default MarketForm
