import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Topbar from "./components/topbar/Topbar";
import Community from "./pages/community/Community";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useDispatch, useSelector } from "react-redux/es/exports";
import './assets/scss/reset.scss'
import './assets/scss/fontFace.scss'
import './assets/scss/customStyle.scss'
import User from "./pages/user/User";
import UpdateAccount from "./pages/updateAccount/UpdateAccount";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import PostsCategory from "./pages/postsCategory/PostsCategory";
import { appStart } from "./redux/appSlice";


export default function App() {
  const {userInfo} = useSelector(state => state.user)
  console.log(userInfo)
  const dispatch = useDispatch()
  dispatch(appStart())
  return (
    <div className="App">
      <BrowserRouter>
        <Topbar/>
        <Routes>
          <Route path="/register" element={userInfo ? <Home/> : <Register/>}/>
          <Route path="/login" element={userInfo ? <Home/> : <Login/>}/>

          <Route path="/" element={<Community/>}/>
          <Route path="/users/:userId" element={<User/>}/>
          <Route path="/posts/:postId" element={<Single/>}/>
          <Route path='/posts' element={<PostsCategory/>}/>

          <Route path="/home" element={userInfo ? <Home/> : <Login/>}/>
          <Route path="/write" element={userInfo ? <Write/> : <Login/>}/>
          <Route path="/updateAccount" element={userInfo ? <UpdateAccount/> : <Login/>}/>
          <Route path='/manageUsers' element={userInfo ? <ManageUsers/> : <Login/>}/>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}