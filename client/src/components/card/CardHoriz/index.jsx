import {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import "./style.css";
import {useAuth} from "../../../hooks";
import {deleteBlog, reset, searchBlog} from "../../../features/blog/blogSlice";
import {Loading} from "../../";

const CardHoriz = ({blog, search}) => {
  const {_id, user, title, description, createdAt, thumbnail} = blog;

  const dispatch = useDispatch();

  const {user: authUser, id: userId} = useAuth();

  const handleDelete = () => {
    if (!authUser || !authUser.accessToken) return;

    if (userId !== user) {
      toast.error("Invalid Authentication.");
    }

    if (window.confirm("Do you really want to delete this post?")) {
      dispatch(deleteBlog(_id, authUser.accessToken));
    }
  };

  const {isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        toast.error(message.message || "something went wrong");
      } else {
        toast.error(message || "something went wrong");
      }
    }
    if (isSuccess) {
      if (typeof message === "object") {
        toast.success(message.message);
      } else {
        toast.success(message);
      }
      dispatch(searchBlog(search));
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="card">
        {thumbnail && (
          <>
            {typeof thumbnail === "string" ? (
              <Link to={`/blog/${_id}`}>
                {/* <img src={thumbnail} alt={title} /> */}
              </Link>
            ) : (
              <img src={URL.createObjectURL(thumbnail)} alt={title} />
            )}
          </>
        )}
        <h2>
          <Link to={`/blog/${_id}`}>{title}</Link>
        </h2>
        <p>{description}</p>
        {authUser && user === userId && (
          <>
            <Link to={`/update_blog/${_id}`} className="btn btn-update">
              Update
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">
              Delete
            </button>
            <br />
            <br />
            <small className="time">
              {new Date(createdAt).toLocaleString()}
            </small>
          </>
        )}
      </div>
    </>
  );
};

export default CardHoriz;
