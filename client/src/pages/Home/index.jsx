import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth, useTitle} from "../../hooks";
import {Loading} from "../../components";

const Home = () => {
  useTitle("Home");

  const navigate = useNavigate();

  const {user, isLoading} = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <p>home</p>
    </div>
  );
};

export default Home;
