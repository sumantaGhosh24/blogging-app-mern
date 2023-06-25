import {useState} from "react";
import {useDispatch} from "react-redux";

import "./style.css";
import {updateUser} from "../../../features/user/userSlice";
import {convertToBase64} from "../../../lib";

const UserInfo = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUser({...user, avatar: base64});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser(user));
  };

  const {name, avatar, email} = user;

  return (
    <>
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="avatar">User Profile :</label>
          <input
            type="file"
            accept="image/*"
            name="avatar"
            id="avatar"
            onChange={handleFile}
          />
          {avatar && <img src={avatar} alt={name} className="preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="userUpdate-btn">
          Update
        </button>
      </form>
    </>
  );
};

export default UserInfo;
