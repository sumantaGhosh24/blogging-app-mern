import {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {useAuth, useTitle} from "../../hooks";
import {getBlog, reset} from "../../features/blog/blogSlice";
import {DisplayBlog, Loading} from "../../components";

const Blog = () => {
  useTitle("Detailed Blog");

  const {id} = useParams();
  const {user} = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {blog, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        toast.error(message.message);
      } else {
        toast.error(message);
      }
    }
    if (isSuccess) {
      if (typeof message === "object") {
        toast.success(message.message);
      } else {
        toast.success(message);
      }
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (!id) return;
    dispatch(getBlog(id));
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return <div>{blog && <DisplayBlog blog={blog} />}</div>;
};

export default Blog;
