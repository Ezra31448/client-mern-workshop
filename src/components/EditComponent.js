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
    slug: "" 
  });
  const [ content, setContent ] = useState(''); 
  const { title, slug } = state;
  
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
          const { title, content, slug} = response.data;
          setState({...setState, title, slug});
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
