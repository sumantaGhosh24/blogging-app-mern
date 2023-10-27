import {useRef, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import "./style.css";
import {CardHoriz, CreateForm, Loading, ReactQuill} from "../../components/";
import {createBlog, reset} from "../../features/blog/blogSlice";
import {useAuth, useTitle} from "../../hooks";

const CreateBlog = () => {
  useTitle("Create Form");

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

  const {user} = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, dispatch, navigate, message]);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;
    const text = div?.innerText;
    setText(text);
  }, [body]);

  const handleSubmit = async () => {
    if (!user.accessToken) return;

    let newData = {...blog, content: body};
    dispatch(createBlog(newData));
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
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
