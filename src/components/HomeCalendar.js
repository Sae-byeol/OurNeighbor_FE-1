import React, {Component,useState,useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../HomeCalendar.css'
import axios from 'axios'

import styled from "@emotion/styled"
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button, .fc-button.fc-next-button, .fc-button.fc-button-primary{
    background: #433;
    background-image: none;
}`

function HomeCalender ({events}) {
    /*const [events, setEvents]=useState([]);

    useEffect(() => {
        axios.get('dummy/calendar_list.json')
        .then(res=>setEvents(res.data.calendarList))
       .catch(err=>console.log(err));
       }, []);*/
   
    return (  
        <div className='calendarHome'>
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
export default HomeCalender;