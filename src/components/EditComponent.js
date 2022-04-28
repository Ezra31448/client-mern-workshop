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
  const { title, slug, type} = state;
  const [duration, setDuration ] = useState('');
  
  const params = useParams();
  //กำหนดค่าให้ State
  const inputValue = (name) => (event) => {
    console.log(name, "=", event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const submitContent = (e) => {
    setContent(e);
  }
  const submitDuration = (e) => {
    setDuration(e.target.value);
  }
  useEffect(() => {  
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then((response) => {
          const { title, content, slug, type, duration} = response.data;
          setState({...setState, title, slug, type});
          setContent(content);
          setDuration(duration);
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
            onChange={submitDuration}
          />
        </div>
        <br></br>
        <div className="d-flex justify-content-end">
        <input type="submit" value="อัพเดต" className="btn btn-primary " />
        </div>
        
      </form>
)
    const submitForm = (e) => {
      e.preventDefault();
      console.table({title, content});
      console.log(`API URL : ${process.env.REACT_APP_API}`);
      axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, type, duration})
        .then((response) => {
          const {title, content, slug} = response.data
          Swal.fire("อัพเดต!", "อัพเดตข้อมูลเรียบร้อย", "success");
          setState({ ...state, title, slug, type, duration});
          setContent(content);
          setDuration(duration);
        })
        .catch((err) => {
          Swal.fire("ผิดพลาด!", err.response.data.error, "error");
        });
    };
  return (
    <div className="container p-5 bg-light">
      <NavbarComponent />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  );
};

export default EditComponent;
