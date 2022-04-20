import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const FromComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    type: "",
    duration: "",
    date: "",
  });

  const [content, setContent] = useState('');

  const { title, author, type, duration, date } = state;
  //กำหนดค่าให้ State
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  }

  const submitForm = (e) => {
    e.preventDefault();
    //console.table({title, content, author});
    console.log(`API URL : ${process.env.REACT_APP_API}`);
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author, type, duration, date })
      .then((response) => {
        Swal.fire("ยอดเยี่ยม!", "บันทึกข้อมูลสำเร็จ", "success");
        setState({ ...state, title: "", content: "", author: "", type: "", duration: "", date: "" });
        setContent("")
      })
      .catch((err) => {
        Swal.fire("ผิดพลาด!", err.response.data.error, "error");
        //setState({ ...state, title: "", content: "", author: "" });
      });
  };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบทความ</h1>

      {/* {JSON.stringify(state)} */}

      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
            placeholder="ชื่อกิจกรรมที่ทำ"
          />
        </div>
        <div className="form-group">
          <label>รายละเอียดกิจกรรม</label>
          <ReactQuill
            value={content}
            onChange={submitContent}
            theme="snow"
            className=""
            placeholder="เขียนรายละเอียดการออกกำลังกาย"
          />
        </div>
        <div className="form-control">
          <lable>ประเภทกิจกรรม</lable>
          <select
            className="form-control"
            name='type'
            value={type}
            onChange={inputValue("type")}
          >
            <option value=''>เลือกประเภทกิจกรรม</option>
            <option value='วิ่ง'>วิ่ง</option>
            <option value='ปั่นจักรยาน'>ปั่นจักรยาน</option>
            <option value='ว่ายน้ำ'>ว่ายน้ำ</option>
            <option value='เดิน'>เดิน</option>
            <option value='เดินเขา'>เดินเขา</option>
          </select>
        </div>

        <div className="from-group">
          <label> ระยะเวลา :</label>
          <input
            className="form-control"
            type='number'
            placeholder='เวลาที่ใช้ (นาที)'
            name='duration'
            value={duration}
            onChange={inputValue("duration")}
          />
        </div>

        <div className="form-group">
          <label>Date :</label>
          <input
            className="form-group"
            name='date'
            type='date'
            value={date}
            onChange={inputValue("date")}
          />
        </div>

        <br></br>
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FromComponent;
