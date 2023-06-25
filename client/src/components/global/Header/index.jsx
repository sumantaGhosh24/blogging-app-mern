import {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css";
import {logout} from "../../../features/auth/authSlice";
import {useAuth} from "../../../hooks";
import {CardHoriz, Loading} from "../../";
import {searchBlog} from "../../../features/blog/blogSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const {user, role, id} = useAuth();

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

  const {searchBlogs, isLoading} = useSelector((state) => state.blog);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (search.length < 2) return;
      dispatch(searchBlog(search));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

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
              <Link to={`/profile/${id}`} className="nav-link">
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
      <div className="search-blog-container">
        {search.length >= 2 && (
          <div>
            {searchBlogs.length ? (
              <div className="search-blogs">
                {searchBlogs?.map((blog) => (
                  <CardHoriz key={blog._id} blog={blog} search={search} />
                ))}
              </div>
            ) : (
              <h3 className="search-blog-error">No blog found</h3>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
