import {useRef, useState, useEffect} from "react";
import propTypes from "prop-types";

import "./style.css";
import {LiteQuill} from "../../";

const Input = ({callback, edit, setEdit}) => {
  const [body, setBody] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    if (edit) setBody(edit.content);
  }, [edit]);

  const handleSubmit = () => {
    const div = divRef.current;
    const text = div?.innerText;
    if (!text.trim()) {
      if (setEdit) return setEdit(undefined);
      return;
    }
    callback(body);
    setBody("");
  };

  return (
    <div className="create-comment-container">
      <h3>Create Comment</h3>
      <LiteQuill body={body} setBody={setBody} />
      <div ref={divRef} dangerouslySetInnerHTML={{__html: body}} />
      <button onClick={handleSubmit}>{edit ? "Update" : "Send"}</button>
    </div>
  );
};

export default Input;

Input.propTypes = {
  callback: propTypes.any,
  edit: propTypes.any,
  setEdit: propTypes.any,
};
