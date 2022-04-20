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
  });

  const [content, setContent] = useState(''); 

  const { title, author } = state;
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
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author })
      .then((response) => {
        Swal.fire("ยอดเยี่ยม!", "บันทึกข้อมูลสำเร็จ", "success");
        setState({ ...state, title: "", content: "", author: "" });
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
        {/* <div className="form-group">
          <label>ผู้แต่ง</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div> */}
        <br></br>
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default FromComponent;
