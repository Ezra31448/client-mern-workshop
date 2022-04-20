import axios from "axios";
import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import { useParams } from "react-router-dom";

const SingleComponent = () => {
  const [blog, setBlog] = useState("");
  const params = useParams();
  useEffect(() => {  
    (async () => {
      await axios
        .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then((response) => {
          setBlog(response.data);
        })
        .catch((err) => alert(err));
    })();
  });
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.content}}></div>
      <p className="text-muted">
        Date : {new Date(blog.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default SingleComponent;
