import React, { useState } from "react";
import "../AddEvent.css";
import axios from "axios";

const Add = (props) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");

  console.log(date);

  const onSubmit = (e) => {
    e.preventDefault();
    //add함수 props로 받아오기
    axios.post(
      "/schedules", 
      {
        date: "2022-01-25",
        content: "test1",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    props.addVisible();
  };
  return (
    <form onSubmit={onSubmit} className="addEvent-form">
      <h3>새로운 일정을 추가하세요</h3>
      <input
        className="addEvent-input"
        placeholder="YYYY-MM-DD"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      ></input>
      <br />
      <input
        className="addEvent-input"
        placeholder="일정 이름"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <br />
      <button className="addBtn" type="submit">
        추가하기
      </button>
    </form>
  );
};

export default Add;
