import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComment = (props) => {
  const { parentComment, index, commentList, setCommentList } = props;

  const childComments = commentList.filter((comment) => {
    return parentComment.index === comment.index && parentComment !== comment;
  });

  return (
    <div>
      {parentComment.comment.length > 50 ? (
        <div>
          <div className="reply-comment">
            <div className="reply-polygon">
              <img src={"../img/polygon.png"} alt="polygon"></img>
            </div>
            <div className="reply-eachcomment">
              <span>{parentComment.comment}</span>
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
              <span>{parentComment.comment}</span>
            </span>
            <span className="reply-id">&nbsp;&nbsp;reply-id</span>
          </div>
        </div>
      )}
      <ChildComponent
        childComments={childComments}
        index={index}
        commentList={commentList}
        setCommentList={setCommentList}
      ></ChildComponent>
    </div>
  );
};

export default ParentComment;
