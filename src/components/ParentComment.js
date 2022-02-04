import React from "react";
import ChildComponent from "./ChildComponent";

const ParentComment = (props) => {
  const {
    parentComment,
    commentList,
    setCommentList,
    id,
    index,
    author,
    commentPageType,
  } = props;

  const childComments = commentList.filter((comment) => {
    return (
      comment.commentType === "child" &&
      Number(index) === Number(comment.responseTo)
    );
  });

  return (
    <div>
      {String(parentComment.content).length > 50 ? (
        <div>
          <div className="reply-comment">
            <div className="reply-polygon">
              <img src={"../img/polygon.png"} alt="polygon"></img>
            </div>
            <div className="reply-eachcomment">
              <span>
                {parentComment.content.split("\n").map((line) => {
                  return (
                    <span>
                      {line}
                      <br />
                    </span>
                  );
                })}
              </span>
            </div>
          </div>
          <span className="reply-id">
            &nbsp;&nbsp;{parentComment.userNickName}
          </span>
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
            <span className="reply-id">
              &nbsp;&nbsp;{parentComment.userNickName}
            </span>
          </div>
        </div>
      )}
      <ChildComponent
        childComments={childComments}
        commentList={commentList}
        setCommentList={setCommentList}
        id={id}
        index={index}
        author={author}
        commentPageType={commentPageType}
      ></ChildComponent>
    </div>
  );
};

export default ParentComment;
