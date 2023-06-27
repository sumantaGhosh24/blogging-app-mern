import {Link} from "react-router-dom";

import "./style.css";
import {getWordStr} from "../../../lib";

const CardVert = ({blog}) => {
  return (
    <div className="card">
      {typeof blog.thumbnail === "string" && (
        <img src={blog.thumbnail} alt={blog.title} />
      )}
      <div>
        <h5>
          <Link to={`/blog/${blog._id}`} className="card-heading">
            {getWordStr(blog.title)}
          </Link>
        </h5>
        <p className="card-paragraph">{getWordStr(blog.description, 40)}</p>
        <p>
          <small>
            {typeof blog.user !== "string" && (
              <Link to={`/profile/${blog.user._id}`} className="user">
                by, {blog.user.name}
              </Link>
            )}
          </small>
          <br />
          <br />
          <small className="time">
            {new Date(blog.createdAt).toLocaleString()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default CardVert;
