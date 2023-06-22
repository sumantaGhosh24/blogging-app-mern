import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import "./style.css";
import {useAuth, useTitle} from "../../hooks";
import {CardVert, Loading} from "../../components";
import {getHomeBlogs} from "../../features/blog/blogSlice";

const Home = () => {
  useTitle("Home");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading} = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const {homeBlogs, isLoading: blogLoading} = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    dispatch(getHomeBlogs());
  }, [dispatch]);

  if (isLoading || blogLoading) {
    return <Loading />;
  }

  return (
    <div className="home">
      {homeBlogs?.map((homeBlog) => (
        <div key={homeBlog._id} className="home-container">
          {homeBlog.count > 0 && (
            <>
              <h3 className="container-heading">
                <Link to={`/blogs/${homeBlog._id}`}>
                  {homeBlog.name} <small>({homeBlog.count})</small>
                </Link>
              </h3>
              <hr className="hr" />
              <div className="blog-cards">
                {homeBlog?.blogs?.map((blog) => (
                  <CardVert key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          )}
          {homeBlog.count > 4 && (
            <Link to={`/blogs/${homeBlog._id}`} className="read-more">
              Read More
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
