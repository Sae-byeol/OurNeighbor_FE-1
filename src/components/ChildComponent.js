import React, { useState } from "react";
import axios from "axios";

const ChildComponent = (props) => {
  const { childComments, commentList, setCommentList, id, index } = props;
  const [commentContents, setCommentContents] = useState("");
  const [showReply, setShowReply] = useState(false);

  const letShowReply = () => {
    setShowReply(!showReply);
  };
  const textareaChange = (e) => {
    setCommentContents(e.target.value);
  };

  const commentSubmit = (e) => {
    if (commentContents === "") {
      alert("내용을 입력해주세요");
      return;
    }
    let body = {
      content: commentContents,
      responseTo: index,
    };
    console.log(index);

    setCommentList(commentList.concat(body));
    setCommentContents("");
    letShowReply();
    axios
      .post(
        "/comment/" + id,
        {
          postCategory: "recommend",
          content: commentContents,
          responseTo: index,
          commentType: "child",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const style = {
    position: "relative",
    left: "50px",
  };

  const styleTextArea = {
    width: "100%",
    height: "99px",
    margin: "8px 0 17px",
    borderRadius: "11px",
    border: "solid 1px #afafaf",
    justifyContent: "center",
    fontFamily: "HSGaeulSenggak2",
    fontSize: "20px",
    fontWeight: "lighter",
    color: "#433",
  };

  const replyStyle = {
    fontFamily: "HSGaeulSenggak2",
    color: "#433",
    fontSize: "20px",
  };

  const buttonStyle = {
    fontFamily: "HSGaeulSenggak2",
    fontSize: "20px",
    float: "right",
    width: "108px",
    height: "40px",
    margin: "17px 11px 0 1008px",
    padding: "9px 15px 9px 14px",
    borderRadius: "10px",
    border: "solid 1.5px #efb33f",
    backgroundColor: "#fee89a",
    position: "absolute",
    right: "0px",
    bottom: "-40px",
  };

  return (
    <div style={style}>
      <div>
        {childComments.length === 0
          ? null
          : childComments.map((comment) => {
              return (
                <div>
                  {comment.content.length > 62 ? (
                    <div>
                      <div className="reply-comment">
                        <div className="reply-polygon">
                          <img src={"../img/polygon.png"} alt="polygon"></img>
                        </div>
                        <div className="reply-eachcomment">
                          <span>{comment.content}</span>
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
                          <span>{comment.content}</span>
                        </span>
                        <span className="reply-id">&nbsp;&nbsp;reply-id</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
      </div>
      <div onClick={letShowReply} style={replyStyle}>
        대댓글 달기
      </div>
      {showReply ? (
        <div>
          <textarea
            onChange={(e) => textareaChange(e)}
            className="textarea"
            value={commentContents}
            style={styleTextArea}
          ></textarea>
          <button
            className="submit"
            onClick={commentSubmit}
            style={buttonStyle}
          >
            댓글달기
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChildComponent;
