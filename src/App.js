import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import Community from "./pages/community/Community";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useSelector } from "react-redux/es/exports";
import './assets/scss/reset.scss'
import './assets/scss/fontFace.scss'
import './assets/scss/customStyle.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import User from "./pages/user/User";
import UpdateAccount from "./pages/updateAccount/UpdateAccount";
import Management from "./pages/management/Management";
import PostsCategory from "./pages/postsCategory/PostsCategory";


export default function App() {
  const {userInfo} = useSelector(state => state.user)
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/" element={<Community/>}/>
          <Route path="/users/:userId" element={<User/>}/>
          <Route path="/posts/:postId" element={<Single/>}/>
          <Route path='/posts' element={<PostsCategory/>}/>

          <Route path="/home" element={<Home/>}/>
          <Route path="/write" element={<Write/>}/>
          <Route path="/updateAccount" element={<UpdateAccount/>}/>
          <Route path='/management' element={<Management/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}