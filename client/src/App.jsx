import {useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";

import {refreshToken} from "./features/auth/authSlice";
import {Header, Footer, NotFound} from "./components";
import {Category, CreateBlog, Home, Login, Profile, Register} from "./pages";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          {/*  */}
          <Route path="/category" element={<Category />} />
          <Route path="/create_blog" element={<CreateBlog />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
