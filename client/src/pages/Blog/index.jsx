import {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {useTitle} from "../../hooks";
import {getBlog} from "../../features/blog/blogSlice";

const Blog = () => {
  useTitle("Detailed Blog");

  const {id} = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {blog, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.blog
  );

  useEffect(() => {
    if (!id) return;
    dispatch(getBlog({id}));
  }, [id]);

  return (
    <div>
      <p>detailed blog</p>
    </div>
  );
};

export default Blog;
