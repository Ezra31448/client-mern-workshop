import {Routes, Route} from 'react-router-dom'
import App from "./App";
import FromComponent from "./components/FromComponent"
import SingleComponent from './components/SingleComponent';
import EditComponent from './components/EditComponent';
import LoginComponent from './components/LoginComponent';


const MyRoute = () => {
    return (
            <Routes>
                <Route path="/" exact element={<App />} />
                <Route path="/create"  element= {<FromComponent />} />
                <Route path="/blog/:slug"  element={<SingleComponent />} />
                <Route path="/blog/edit/:slug" element={<EditComponent/>} />
                <Route path="/login" element={<LoginComponent />} />
            </Routes>
    );
}

export default MyRoute;