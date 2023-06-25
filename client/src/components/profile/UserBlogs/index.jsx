import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "react-router-dom";

import "./style.css";
import {getBlogsByUser} from "../../../features/blog/blogSlice";
import {CardHoriz, Pagination} from "../../";

const UserBlogs = ({id}) => {
  const {userBlogs} = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const search = window.location.search;

  useEffect(() => {
    if (!id) return;
    dispatch(getBlogsByUser({id, search}));
  }, [id, dispatch, search]);

  const handlePagination = (num) => {
    const search = `?page=${num}`;
    dispatch(getBlogsByUser({id, search}));
  };

  return (
    <div className="profile-pagination-container">
      <h2>User Blogs</h2>
      <div className="profile-blogs">
        {userBlogs?.blogs?.map((blog) => (
          <CardHoriz key={blog._id} blog={blog} />
        ))}
      </div>
      <div>
        <Pagination total={userBlogs.total} callback={handlePagination} />
      </div>
    </div>
  );
};

export default UserBlogs;
