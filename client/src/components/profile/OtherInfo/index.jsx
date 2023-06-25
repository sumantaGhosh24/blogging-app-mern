import "./style.css";

const OtherInfo = ({users}) => {
  return (
    <>
      <h2>User Information</h2>
      <img src={users.avatar} alt={users.name} className="user-image" />
      <h5 className="user-role">Role: {users.role}</h5>
      <h5 className="user-name">
        Name: <span>{users.name}</span>
      </h5>
      <h5 className="user-email">
        Email: <span>{users.email}</span>
      </h5>
      <h5 className="user-date">
        Join Date: <span>{new Date(users.createdAt).toLocaleString()}</span>
      </h5>
    </>
  );
};

export default OtherInfo;
