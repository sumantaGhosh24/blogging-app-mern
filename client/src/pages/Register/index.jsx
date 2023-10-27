import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import "./style.css";
import {Loading} from "../../components";
import {reset, register} from "../../features/auth/authSlice";
import {useTitle, useAuth} from "../../hooks";
import {convertToBase64} from "../../lib";

const Register = () => {
  useTitle("Register User");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
    avatar: "",
  });

  const {name, email, password, cf_password, avatar} = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isLoading, isError, isSuccess, message} = useAuth();

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
        toast.success(message.message || "you are logged in");
      } else {
        toast.success(message || "you are logged in");
      }
      setUserData({
        name: "",
        email: "",
        password: "",
        cf_password: "",
        avatar: "",
      });
      navigate("/login");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setUserData({...userData, avatar: base64});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== cf_password) {
      toast.error("Password and confirm password not match.");
    } else {
      const userData = {
        name,
        email,
        password,
        avatar,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="register-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cf_password">Confirm Password :</label>
          <input
            type="password"
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Profile Picture :</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFile}
          />
          {avatar && <img src={avatar} alt={name} className="preview" />}
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
