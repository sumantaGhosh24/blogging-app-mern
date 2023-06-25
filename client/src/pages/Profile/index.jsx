import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import "./style.css";
import {useAuth, useTitle} from "../../hooks";
import {UserInfo, OtherInfo, UserBlogs, Loading} from "../../components";
import {getUser, reset} from "../../features/user/userSlice";

const Profile = () => {
  useTitle("Profile");

  const {id} = useParams();
  const {id: userId, user} = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {users, isLoading, isSuccess, isError, message} = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, isSuccess, isError]);

  useEffect(() => {
    if (isError) {
      if (typeof message === "object") {
        toast.error(message.message);
      } else {
        toast.error(message);
      }
    }
    if (isSuccess) {
      if (typeof message === "object") {
        toast.success(message.message);
      } else {
        toast.success(message);
      }
    }
    if (!user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="userUpdate-container">
        {id === userId && <UserInfo />}
      </div>
      <div className="otherInfo-container">
        <OtherInfo users={users} />
      </div>
      <div className="userBlog-container">
        <UserBlogs id={id} />
      </div>
    </div>
  );
};

export default Profile;
