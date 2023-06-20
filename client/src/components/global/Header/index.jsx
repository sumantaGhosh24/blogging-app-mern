import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {toast} from "react-toastify";

import "./style.css";
import {logout} from "../../../features/auth/authSlice";
import {useAuth} from "../../../hooks";

const Navbar = () => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const {user, role, _id} = useAuth();

  const guestLinks = [
    {label: "Login", path: "/login"},
    {label: "Register", path: "/register"},
  ];

  const userLinks = [
    {label: "Home", path: "/"},
    {label: "Create Blog", path: "/create_blog"},
  ];

  const navLinks = user ? userLinks : guestLinks;

  const handleLogout = (e) => {
    e.preventDefault();

    if (!user) return;
    dispatch(logout());
  };

  const [search, setSearch] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return setBlogs([]);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/search/blogs?title=${search}`
        );
        setBlogs(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  console.log("blogs", blogs);

  useEffect(() => {
    setSearch("");
    setBlogs([]);
  }, [pathname]);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">
          Logo
        </Link>
        <div className="nav-links">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path} className="nav-link">
              {link.label}
            </Link>
          ))}
          {role === "admin" && (
            <Link to="/category" className="nav-link">
              Category
            </Link>
          )}
          {user && (
            <>
              <Link to={`/profile/${_id}`} className="nav-link">
                Profile
              </Link>
              <Link to="/" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </>
          )}
        </div>
        <form className="nav-search">
          <input
            className="nav-input"
            type="search"
            placeholder="Search your query..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </nav>
      <div>
        {/* {search.length >= 2 && (
          <div>
            {blogs.length ? (
              blogs.map(blog => <CardHoriz key={blog._id} blog={blog} />)
            ) : (<h3>No blog found</h3>)}
          </div>
        )} */}
      </div>
    </>
  );
};

export default Navbar;
