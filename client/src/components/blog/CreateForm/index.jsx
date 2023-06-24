import {useSelector} from "react-redux";
import {convertToBase64} from "../../../lib";

import "./style.css";

const CreateForm = ({blog, setBlog}) => {
  const {category} = useSelector((state) => state.category);

  const handleChange = (e) => {
    const {value, name} = e.target;
    setBlog({...blog, [name]: value});
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setBlog({...blog, thumbnail: base64});
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          id="title"
          name="title"
          value={blog.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="thumbnail">Thumbnail :</label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="image/*"
          onChange={handleFile}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <textarea
          rows={4}
          value={blog.description}
          name="description"
          id="description"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category: </label>
        <select
          value={blog.category}
          name="category"
          onChange={handleChange}
          id="category"
        >
          <option value="">Choose a category</option>
          {category.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default CreateForm;
