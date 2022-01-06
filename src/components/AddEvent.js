import React,{useState} from 'react'
import '../AddEvent.css'
const Add = (props) => {
    const [date, setDate] = useState('');
    const [title, setTitle]=useState('');

    const onSubmit=(e)=>{
        e.preventDefault();
        //add함수 props로 받아오기
        props.addEvent({title:title, date:date});
        props.addVisible();
    }
    return (
        <form onSubmit={onSubmit} className='form'>
            <h3>관리자만 추가가 가능합니다.</h3>
            <input placeholder='YYYY-MM-DD' value={date} onChange={(e)=>setDate(e.target.value)}></input>
            <input placeholder='일정' value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <button className="addBtn"type="submit">추가하기</button>
        </form>
    )
}

export default Add
