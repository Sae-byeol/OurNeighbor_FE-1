import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComment = (props) => {
  const { parentComment, commentList, setCommentList, id, index } = props;

  const childComments = commentList.filter((comment) => {
    return (
      Number(index) === Number(comment.responseTo) &&
      comment.commentType === "child"
    );
  });

  console.log(commentList);
  console.log(parentComment);
  console.log(childComments);

  return (
    <div>
      {String(parentComment.content).length > 50 ? (
        <div>
          <div className="reply-comment">
            <div className="reply-polygon">
              <img src={"../img/polygon.png"} alt="polygon"></img>
            </div>
            <div className="reply-eachcomment">
              <span>{parentComment.contentt}</span>
            </div>
          </div>
          <span className="reply-id">&nbsp;&nbsp;reply-id</span>
        </div>
      ) : (
        <div>
          <div className="reply-comment">
            <div className="reply-polygon">
              <img src={"../img/polygon.png"} alt="polygon"></img>
            </div>
            <span className="reply-eachcomment">
              <span>{parentComment.content}</span>
            </span>
            <span className="reply-id">&nbsp;&nbsp;reply-id</span>
          </div>
        </div>
      )}
      {/* <ChildComponent
        childComments={childComments}
        commentList={commentList}
        setCommentList={setCommentList}
        id={id}
        index={index}
      ></ChildComponent> */}
    </div>
  );
};

export default ParentComment;
