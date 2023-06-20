import CircleLoader from "react-spinners/CircleLoader";

import "./style.css";

const Loading = () => {
  return (
    <div className="loading">
      <CircleLoader color="#0D6EFD" size={480} />
    </div>
  );
};

export default Loading;
