import {useRef, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

import "../CreateBlog/style.css";
import {useAuth} from "../../hooks";
import {CardHoriz, CreateForm, Loading, ReactQuill} from "../../components/";
import {reset, updateBlog} from "../../features/blog/blogSlice";

const UpdateBlog = () => {
  const {id} = useParams();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    description: "",
    thumbnail: "",
    category: "",
  });
  const [body, setBody] = useState("");
  const [text, setText] = useState("");

  const divRef = useRef(null);

  const {user, id: userId} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const getBlog = async () => {
      const response = await axios.get(`http://localhost:8080/api/blog/${id}`);
      setBlog(response.data);
      setBody(response.data.content);
    };
    getBlog();
    const initData = {
      title: "",
      content: "",
      description: "",
      thumbnail: "",
      category: "",
    };
    return () => {
      setBlog(initData);
      setBody("");
    };
  }, [id]);

  const {isSuccess, isLoading, isError, message} = useSelector(
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
      navigate(`/update_blog/${id}`);
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch, navigate]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div?.innerText;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    if (!user.accessToken) return;

    let newData = {...blog, content: body, id};
    if (blog.user._id !== userId) {
      toast.error("Invalid Authentication.");
    }
    dispatch(updateBlog(newData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{width: "100%"}}>
      <div>
        <div className="form-container">
          <h2>Create</h2>
          <CreateForm blog={blog} setBlog={setBlog} />
        </div>
        <div className="preview-container">
          <h2>Preview</h2>
          <CardHoriz blog={blog} />
        </div>
      </div>
      <ReactQuill body={body} setBody={setBody} />
      <div
        ref={divRef}
        dangerouslySetInnerHTML={{__html: body}}
        className="blog-preview"
      />
      <small className="text-length">{text.length}</small>
      <button onClick={handleSubmit} className="blog-btn">
        Update Blog
      </button>
    </div>
  );
};

export default UpdateBlog;
