import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";

import "./style.css";
import {useAuth, useTitle} from "../../hooks";
import {CardVert, Loading, Pagination} from "../../components";
import {getBlogsByCategory, reset} from "../../features/blog/blogSlice";

const CategoryBlog = () => {
  useTitle("Blogs by Category");

  const {categoryBlogs, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.blog
  );

  const {user} = useAuth();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {id} = useParams();

  const search = window.location.search;

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
    dispatch(getBlogsByCategory({id, search}));
  }, [id, dispatch, search]);

  const handlePagination = (num) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByCategory({id, search}));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="category-pagination-container">
      <h2>Blog by Category</h2>
      <div className="category-blogs">
        {categoryBlogs?.blogs?.map((blog) => (
          <CardVert key={blog._id} blog={blog} />
        ))}
      </div>
      {categoryBlogs.total > 1 && (
        <Pagination total={categoryBlogs.total} callback={handlePagination} />
      )}
    </div>
  );
};

export default CategoryBlog;
