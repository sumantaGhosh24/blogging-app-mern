import {Link} from "react-router-dom";
import propTypes from "prop-types";

import "./style.css";

const AvatarComment = ({user}) => {
  return (
    <div className="avatar-comment-container">
      <img src={user?.avatar} alt="avatar" />
      <small>
        <Link to={`/profile/${user?._id}`} className="avatar-comment-link">
          {user?.name}
        </Link>
        <p className="avatar-comment-paragraph">{user?.email}</p>
      </small>
    </div>
  );
};

export default AvatarComment;

AvatarComment.propTypes = {
  user: propTypes.object,
};
