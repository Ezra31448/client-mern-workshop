import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate } from "../service/authorize";
import { useNavigate } from "react-router-dom";
import { getUser } from "../service/authorize";

const LoginComponent = (props) => {
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const { username, password } = state;
    const inputValue = (name) => (event) => {
        console.log(name, "=", event.target.value);
        setState({ ...state, [name]: event.target.value });
    };
    let navigate = useNavigate();
    const submitForm = (e) => {
        e.preventDefault();
        console.table({ username, password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { username, password})
            .then(response => {
                Swal.fire("ยินดีต้อนรับ", "เข้าสู่ระบบสำเร็จ", "success");
                console.log(response.data)
                authenticate(response, navigate("/"))
            })
            .catch((err) => {
                Swal.fire("ผิดพลาด!", err.response.data.error, "error");
            });
    };

    useEffect(()=> {
        getUser() && ((navigate("/")));
        // eslint-disable-next-line
    }, []);
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1>เข้าสู่ระบบ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={inputValue("username")}
                        placeholder="username"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={inputValue("password")}
                        placeholder="password"
                    />
                </div>

                <br></br>
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default LoginComponent;
