import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

import "./style.css";
import {Loading} from "../../components";
import {login, reset} from "../../features/auth/authSlice";
import {useAuth, useTitle} from "../../hooks";

const Login = () => {
  useTitle("Login User");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const {email, password} = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useAuth();

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        toast.error(message.message || "something went wrong");
      } else {
        toast.error(message || "something went wrong");
      }
    }
    if (isSuccess) {
      toast.success("User login successful.");
      setUserData({
        email: "",
        password: "",
      });
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
