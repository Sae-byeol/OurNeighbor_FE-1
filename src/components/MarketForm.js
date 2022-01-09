import React from 'react'
import '../MarketForm.css'

const MarketForm = (props) => {
    return (
        
        <div className='marketForm'>
            <div className='marketForm-title'>{props.market.title}</div>
            <img className="marketForm-img" src={props.market.img}></img>
        </div>
        
        
    )
}

export default MarketForm
