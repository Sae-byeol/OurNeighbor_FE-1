import React, { Component, useState, useEffect } from "react";
import FullCalendar, { ElementDragging } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../calender.css";
import axios from "axios";
import Swal from "sweetalert2";

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
  });

  // 일정 삭제 버튼 누를 때 실행
  const removeEvent = (e) => {
    console.log("success");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: e.event.title + " 이벤트를 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니요",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete("/schedules/" + e.event.id, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            })
            .then((res) => {
              setEvents(res.data);
              Swal.fire({
                icon: "success",
                title: "삭제되었습니다.",
              });
            })
            .catch((err) => console.log(err));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: "취소합니다.",
          });
        }
      });
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
