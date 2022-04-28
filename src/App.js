import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";

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
    <div className="container p-5 bg-light">
      <NavbarComponent className="justify-content-center" />
      <div className="d-grid justify-content-center">
        {blogs.map((blog, index) => (
          <div
            className="row "
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2 ">
              <Card border="primary" style={{ width: "18rem" }}>
                <Card.Header>{blog.title}</Card.Header>
                <Card.Body>
                  <Card.Title>
                    <Link to={`/blog/${blog.slug}`}>
                      <h2>{blog.title}</h2>
                    </Link>
                  </Card.Title>
                  <Card.Text>
                    ประเภทกิจกรรม : {blog.type} <br />
                    ระยะเวลา : {blog.duration} นาที
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.content.substring(0, 180),
                      }}
                    ></div>
                    <p className="text-muted">
                      Date : {new Date(blog.createdAt).toLocaleString()}
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
              {getUser() && (
                <div className="d-flex flex-row-reverse">
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
    </div>
  );
}

export default App;
