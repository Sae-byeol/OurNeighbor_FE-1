import React, { useState } from "react";
import ChildComponent from "./ChildComponent";
import axios from "axios";
import "../BestPostView.css";

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

  // console.log(parentComment);
  // console.log(childComments);

  // // 댓글 삭제 버튼 누를 때 실행
  // const onClickDeleteReplyButton = (e) => {
  //   e.preventDefault();
  //   if (window.confirm("댓글을 삭제하시겠습니까?")) {
  //     parentComment.content = "삭제된 댓글입니다.";
  //     console.log(parentComment.content);
  //   }
  // };

  // // 댓글 삭제 버튼 보여주는 코드
  // const showDeleteReplyButton = (e) => {
  //   if (String(parentComment.userNickName) === String(author)) {
  //     return (
  //       <button
  //         className="best-replyDeleteButton"
  //         onClick={(e) => onClickDeleteReplyButton(e)}
  //       >
  //         | 댓글 삭제
  //       </button>
  //     );
  //   }
  // };

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
            {/* {showDeleteReplyButton()} */}
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
              {/* {showDeleteReplyButton()} */}
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