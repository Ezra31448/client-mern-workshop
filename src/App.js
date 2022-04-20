import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { getUser } from "./service/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => alert(err));
  };
  console.log(blogs);
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success");
        fetchData();
      })
      .catch((response) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            {/* <p>{`/blog/${blog.slug}`}</p> */}

            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <div>ประเภทกิจกรรม : {blog.type}</div>
            <div>ระยะเวลา : {blog.duration} นาที</div>
            <div
              dangerouslySetInnerHTML={{
                __html: blog.content.substring(0, 180),
              }}
            ></div>
            <p className="text-muted">
              Date : {new Date(blog.date).toLocaleString()}
            </p>

            {getUser() && (
              <div>
                <Link
                  to={`/blog/edit/${blog.slug}`}
                  className="btn btn-outline-secondary"
                >
                  แก้ไข
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => confirmDelete(blog.slug)}
                >
                  ลบ
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
