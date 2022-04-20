import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";



const FromComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    type: "",
    duration: "",
    date: "",
  });

  const [content, setContent] = useState("");
  // const [date, setDate] = useState(new Date());

  const { title, author, type, duration } = state;
  //กำหนดค่าให้ State
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  // const submitDate = (e) => {
  //   setDate(e);
  // }

  const submitForm = (e) => {
    e.preventDefault();
    //console.table({title, content, author});
    console.log(`API URL : ${process.env.REACT_APP_API}`);
    axios
      .post(`${process.env.REACT_APP_API}/create`, {
        title,
        content,
        author,
        type,
        duration,
      })
      .then((response) => {
        Swal.fire("ยอดเยี่ยม!", "บันทึกข้อมูลสำเร็จ", "success");
        setState({
          ...state,
          title: "",
          content: "",
          author: "",
          type: "",
          duration: "",
        });
        setContent("");
      })
      .catch((err) => {
        Swal.fire("ผิดพลาด!", err.response.data.error, "error");
        //setState({ ...state, title: "", content: "", author: "" });
      });
  };
  return (
    <div className="container p-5 bg-light">
      <NavbarComponent />
      
      <br />
      <h1>เพิ่มกิจกรรม</h1>


      <form onSubmit={submitForm} >
        <div className="form-group">
          <label>ชื่อกิจกรรม</label>
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
            name="type"
            value={type}
            onChange={inputValue("type")}
          >
            <option value="">เลือกประเภทกิจกรรม</option>
            <option value="วิ่ง">วิ่ง</option>
            <option value="ปั่นจักรยาน">ปั่นจักรยาน</option>
            <option value="ว่ายน้ำ">ว่ายน้ำ</option>
            <option value="เดิน">เดิน</option>
            <option value="เดินเขา">เดินเขา</option>
          </select>
        </div>

        <div className="from-group">
          <label> ระยะเวลา :</label>
          <input
            className="form-control"
            type="number"
            placeholder="เวลาที่ใช้ (นาที)"
            name="duration"
            value={duration}
            onChange={inputValue("duration")}
          />
        </div>

        {/* <div className="form-group">
          <label>Date :</label>
          <input
            className="form-group"
            name='date'
            type='date'
            value={date}
            onChange={submitDate}
          />
        </div> */}

        <br></br>
        <div className=" d-flex justify-content-end">
          <input type="submit" value="บันทึก" className="btn btn-primary" />
        </div>
        
      </form>
    </div>
  );
};

export default FromComponent;
