import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import propTypes from "prop-types";

const LiteQuill = ({body, setBody}) => {
  const modules = {toolbar: {container}};

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="write something..."
        onChange={(e) => setBody(e)}
        value={body}
      />
    </div>
  );
};

let container = [
  [{font: []}],
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block", "link"],
  [{color: []}, {background: []}],
  [{script: "sub"}, {script: "super"}],
];

export default LiteQuill;

LiteQuill.propTypes = {
  body: propTypes.string,
  setBody: propTypes.any,
};
