import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import propTypes from "prop-types";

import "./style.css";

const Quill = ({body, setBody}) => {
  const modules = {toolbar: {container}};

  return (
    <div className="editor-container">
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
      />
    </div>
  );
};

let container = [
  [{font: []}],
  [{header: [1, 2, 3, 4, 5, 6, false]}],
  [{size: ["small", false, "large", "huge"]}], // custom dropdown

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  [{color: []}, {background: []}], // dropdown with defaults from theme
  [{script: "sub"}, {script: "super"}], // superscript/subscript

  [{list: "ordered"}, {list: "bullet"}],
  [{indent: "-1"}, {indent: "+1"}], // outdent/indent
  [{direction: "rtl"}], // text direction
  [{align: []}],

  ["clean", "link", "image", "video"],
];

export default Quill;

Quill.propTypes = {
  body: propTypes.string,
  setBody: propTypes.any,
};
