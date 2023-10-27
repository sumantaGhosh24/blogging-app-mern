import {useEffect} from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch} from "react-redux";
import propTypes from "prop-types";

import {refreshToken} from "./features/auth/authSlice";
import {Header, Footer, NotFound, Loading} from "./components";
import {
  Blog,
  Category,
  CategoryBlog,
  CreateBlog,
  Home,
  Login,
  Profile,
  Register,
  UpdateBlog,
} from "./pages";
import {getCategory} from "./features/category/categorySlice";
import {useAuth} from "./hooks";

const GuestAuth = ({elm}) => {
  const {user, isLoading} = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (user) {
    content = <Navigate to="/" state={{from: location}} replace />;
  } else {
    content = elm;
  }

  return content;
};

const UserAuth = ({elm}) => {
  const {user, isLoading} = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (user) {
    content = elm;
  } else {
    content = <Navigate to="/login" state={{from: location}} replace />;
  }

  return content;
};

const AdminAuth = ({elm}) => {
  const {user, isLoading, role} = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  let content;

  if (user && role === "admin") {
    content = elm;
  } else if (user && role !== "admin") {
    content = <Navigate to="/" state={{from: location}} replace />;
  } else {
    content = <Navigate to="/login" state={{from: location}} replace />;
  }

  return content;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<GuestAuth elm={<Register />} />} />
          <Route path="/login" element={<GuestAuth elm={<Login />} />} />
          <Route path="/" element={<UserAuth elm={<Home />} />} />
          <Route path="/category" element={<AdminAuth elm={<Category />} />} />
          <Route
            path="/create_blog"
            element={<UserAuth elm={<CreateBlog />} />}
          />
          <Route path="/profile/:id" element={<UserAuth elm={<Profile />} />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route
            path="/update_blog/:id"
            element={<UserAuth elm={<UpdateBlog />} />}
          />
          <Route
            path="/blogs/:id"
            element={<UserAuth elm={<CategoryBlog />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;

GuestAuth.propTypes = {
  elm: propTypes.any,
};

UserAuth.propTypes = {
  elm: propTypes.any,
};

AdminAuth.propTypes = {
  elm: propTypes.any,
};
