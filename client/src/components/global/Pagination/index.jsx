import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import propTypes from "prop-types";

import "./style.css";

const Pagination = ({total, callback}) => {
  const [page, setPage] = useState(1);

  const newArr = [...Array(total)].map((_, i) => i + 1);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = window.location.search;

  const isActive = (index) => {
    if (index === page) return "active";
    return "";
  };

  const handlePagination = (num) => {
    setSearchParams({page: num});
    callback(num);
  };

  useEffect(() => {
    const num = searchParams.get("page");
    setPage(Number(num));
  }, [search]);

  return (
    <nav className="pagination">
      <ul>
        {page > 1 && (
          <li onClick={() => handlePagination(page - 1)}>
            <span aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}
        {newArr.map((num) => (
          <li
            key={num}
            className={`page-item ${isActive(num)}`}
            onClick={() => handlePagination(num)}
          >
            <span>{num}</span>
          </li>
        ))}
        {page < total && (
          <li onClick={() => handlePagination(page + 1)}>
            <span aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

Pagination.propTypes = {
  total: propTypes.number,
  callback: propTypes.any,
};
