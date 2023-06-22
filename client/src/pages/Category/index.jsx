import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import "./style.css";
import {NotFound} from "../../components";
import {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "../../features/category/categorySlice";
import {useAuth} from "../../hooks";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState(null);

  const {user, role} = useAuth();
  const {category, isSuccess, isLoading, isError, message} = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.accessToken || !name) return;

    if (edit) {
      if (edit.name === name) return;
      const data = {...edit, name};
      dispatch(updateCategory(data, user.accessToken));
    } else {
      dispatch(createCategory(name, user.accessToken));
    }
    setName("");
    setEdit(null);
  };

  const handleDelete = (id) => {
    if (!user.accessToken) return;
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategory(id, user.accessToken));
    }
  };

  if (role !== "admin") return <NotFound />;

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <div>
            {edit && <p onClick={() => setEdit(null)}>X</p>}
            <input
              type="text"
              name="category"
              id="category"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit">{edit ? "Update" : "Create"}</button>
          </div>
        </form>
        <div>
          {category.map((category) => (
            <div key={category._id}>
              <p>{category.name}</p>
              <div>
                <p onClick={() => setEdit(category)}>Edit</p>
                <p onClick={() => handleDelete(category._id)}>Delete</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
