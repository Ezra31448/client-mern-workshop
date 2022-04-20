import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../service/authorize";
import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";


const NavbarComponent = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        console.log(getUser());
        setIsLogin(getUser());
    }, []);

    let navigate = useNavigate();
    return (
        <Nav className="justify-content-center">
            <ul className="nav nav-tabs ">
                <li className="nav-item pr-3 pt-3 pb-3">
                    <Link to={`/`} className="nav-link">หน้าแรก</Link>
                </li>
                
                {
                    !isLogin && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to={`/login`} className="nav-link">เข้าสู่ระบบ</Link>
                        </li>
                    )
                }
                {
                    isLogin && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <Link to={`/create`} className="nav-link">เพิ่มกิจกรรม</Link>
                        </li>
                    )
                }
                {
                    isLogin && (
                        <li className="nav-item pr-3 pt-3 pb-3">
                            <button onClick={()=>{logout(); navigate("/login")}} className="nav-link">ออกจากระบบ</button>
                        </li>
                    )
                    
                }
                

            </ul>
        </Nav>
    )
}

export default NavbarComponent;