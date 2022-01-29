import React, { Component, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../calender.css";
import axios from "axios";

import styled from "@emotion/styled";
export const StyleWrapper = styled.div`
  .fc-button.fc-prev-button,
  .fc-button.fc-next-button,
  .fc-button.fc-button-primary {
    background: #433;
    background-image: none;
  }
`;

function Calender(props) {
  //console.log(events);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    //console.log(localStorage.getItem("accessToken"));
    axios
      .get("/apartment/schedules", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        //console.log("success");
        setEvents(res.data);
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeEvent = (e) => {
    if (window.confirm(e.event.title + " 이벤트를 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
      //삭제 url로 post 보내고 res.data로 setEvents(CalendatHome의 메소드 사용)
      //setEvents=>useEffect 실행되며 재렌더링 ok
      /*setEvents([
                    { title: "event1", 
                        date: "2022-01-01",
                        id:1
                    }
                ]
            )*/
    } else {
      alert("취소합니다.");
    }
  };
  return (
    <div className="calender">
      <StyleWrapper>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          eventClick={removeEvent}
          //eventClick={clickDate}
          events={events}
          eventColor="#efb33f"
        ></FullCalendar>
      </StyleWrapper>
    </div>
  );
}
export default Calender;
