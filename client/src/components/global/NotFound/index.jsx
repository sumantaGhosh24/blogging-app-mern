import {Link} from "react-router-dom";

import "./style.css";

const NotFound = () => {
  return (
    <div className="body">
      <div className="not-found-container">
        <h1>404</h1>
        <p>Oops! The page you&apos;re looking for could not be found.</p>
        <p>
          Go back to{" "}
          <Link className="not-found-link" to="/">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
