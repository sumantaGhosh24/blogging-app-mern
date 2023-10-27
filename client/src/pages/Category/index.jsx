import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import "./style.css";
import {Loading} from "../../components";
import {
  createCategory,
  deleteCategory,
  getCategory,
  reset,
  updateCategory,
} from "../../features/category/categorySlice";
import {useAuth, useTitle} from "../../hooks";

const Category = () => {
  useTitle("Manage Category");

  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);

  const {user} = useAuth();

  const {category, isSuccess, isLoading, isError, message} = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        toast.error(message.message || "something went wrong");
      } else {
        toast.error(message || "something went wrong");
      }
    }
    if (isSuccess) {
      if (typeof message === "object") {
        toast.success(message.message || "success");
      } else {
        toast.success(message || "success");
      }
      dispatch(getCategory());
      setName("");
    }
    dispatch(reset());
  }, [category, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.accessToken || !name) return;

    if (edit) {
      if (edit.name === name) return;
      const data = {...edit, name};
      dispatch(updateCategory(data));
    } else {
      dispatch(createCategory({name}));
      dispatch(getCategory());
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id) => {
    if (!user.accessToken) return;
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="categoryForm-container">
        <h2>{edit ? "Update" : "Create"} Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            {edit && (
              <p className="close-btn" onClick={() => setEdit(null)}>
                X
              </p>
            )}
            <input
              type="text"
              name="category"
              id="category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={edit ? "btn update-btn" : "btn create-btn"}
          >
            {edit ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.createdAt}</td>
                <td>{category.updatedAt}</td>
                <td>
                  <button
                    className="btn update-btn"
                    onClick={() => setEdit(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
