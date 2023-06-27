import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import "./style.css";
import {useAuth} from "../../../hooks";
import {
  createComment,
  getComments,
  reset,
} from "../../../features/comment/commentSlice";
import {Input, Comments, Loading} from "../../";

const DisplayBlog = ({blog}) => {
  const {user, id} = useAuth();

  const {comment, isError, isLoading, isSuccess, message} = useSelector(
    (state) => state.comment
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(getComments(blog._id));
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleComment = (body) => {
    if (!user.accessToken) return;
    const data = {
      content: body,
      user: id,
      blog: blog._id,
      blog_user_id: blog.user._id,
    };
    dispatch(createComment(data));
  };

  useEffect(() => {
    if (!blog._id) return;
    dispatch(getComments(blog._id));
  }, [blog._id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="detail-blog-container">
        <h2>{blog.title}</h2>
        <h3>{blog.description}</h3>
        <h4>
          Category: <span>{blog.category.name}</span>
        </h4>
        <div className="date">
          <p>
            Blog Posted :{" "}
            <span>{new Date(blog.createdAt).toLocaleString()}</span>
          </p>
          <p>
            Blog Updated :{" "}
            <span>{new Date(blog.updatedAt).toLocaleString()}</span>
          </p>
        </div>
        <img src={blog.thumbnail} alt="thumbnail" />
        <div
          dangerouslySetInnerHTML={{__html: blog.content}}
          className="content"
        />
        <div className="profile-card">
          <img src={blog.user.avatar} alt={blog.user.name} />
          <h3>
            Name: <span>{blog.user.name}</span>
          </h3>
          <p>
            Email: <span>{blog.user.email}</span>
          </p>
          <p>
            Role: <span>{blog.user.role}</span>
          </p>
          <p>
            User since: <span>{blog.user.createdAt}</span>
          </p>
        </div>
      </div>
      <div className="comment-container">
        <h3>Comments</h3>
        <Input callback={handleComment} />
        <h4>All Comments</h4>
        {comment?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default DisplayBlog;
