import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const EditComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "", 
    type: "",
    duration: "",
  });
  const [ content, setContent ] = useState(''); 
  const { title, slug, type, duration,} = state;
  // const [date, setDate] = useState(new Date());
  
  const params = useParams();
  //กำหนดค่าให้ State
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const submitContent = (e) => {
    setContent(e);
  }
  useEffect(() => {  
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then((response) => {
          const { title, content, slug, type, duration, date} = response.data;
          setState({...setState, title, slug, type, duration, date});
          setContent(content);
        })
        .catch((err) => alert(err));
    })();
    // eslint-disable-next-line
  }, []);

  const showUpdateForm = () => (
    <form onSubmit={submitForm}>
        <div className="form-group">
          <label>ชื่อบทความ</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>รายละเอียดกิจกรรม</label>
          <ReactQuill 
            value={content}
            onChange={submitContent}
            theme="snow"
            className=""
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

        {/* <div className="form-group">
          <label>Date :</label>
          <input
            className="form-group"
            name='date'
            type='date'
            value={date}
            onChange={inputValue("date")}
          />
        </div> */}
        <br></br>
        <input type="submit" value="อัพเดต" className="btn btn-primary" />
      </form>
)
    const submitForm = (e) => {
      e.preventDefault();
      //console.table({title, content, author});
      console.log(`API URL : ${process.env.REACT_APP_API}`);
      axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content})
        .then((response) => {
          const {title, content, slug} = response.data
          Swal.fire("อัพเดต!", "อัพเดตข้อมูลเรียบร้อย", "success");
          setState({ ...state, title, slug});
          setContent(content);
        })
        .catch((err) => {
          Swal.fire("ผิดพลาด!", err.response.data.error, "error");
          //setState({ ...state, title: "", content: "", author: "" });
        });
    };
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
