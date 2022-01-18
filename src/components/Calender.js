import React, {Component,useState,} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../calender.css'
import axios from 'axios'

import styled from "@emotion/styled"
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
    background: #433;
    background-image: none;
}`

function Calender ({ events}) {
    
    /*const [title, setTitle]=useState('');
    const [date, setDate]=useState('');

    async function postName(e){
        e.preventDefault();
        try{
            await axios.post("http://localhost:4000/post_name",{
                title
            })
        }catch(error){
            console.log(error)
        }
    }*/
   
  
    /*const clickDate=(e)=>{
        //e.preventDefault();
        setTodayTitle(e.event.title);
    }*/
    return (  
        <div className='calender calendarHome'>
            <StyleWrapper>
            <FullCalendar 
            defaultView="dayGridMonth" 
            plugins={[ dayGridPlugin ]}
            //eventClick={clickDate}
            events={events}
            eventColor='#efb33f'></FullCalendar>
            </StyleWrapper>
        </div>
    )

}
export default Calender;