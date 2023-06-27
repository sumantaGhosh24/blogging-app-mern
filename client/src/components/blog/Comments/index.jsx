import {AvatarComment} from "../../";

const Comments = ({comment}) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      <AvatarComment user={comment.user} />
      <div dangerouslySetInnerHTML={{__html: comment.content}} />
    </div>
  );
};

export default Comments;
