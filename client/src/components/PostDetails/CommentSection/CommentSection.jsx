import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./CommentSection.Styles";
import { commentPost } from "../../../state/actions/postAction";

const CommentSection = (props) => {
  const classes = useStyles();
  const oldComments = useSelector((state) => state.postReducer.post.comments);
  const [comments, setComments] = useState(oldComments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const submitHandler = async () => {
    const finalComment = `${user?.result?.name.split(" ")[0]}: ${comment}`;

    const newComments = await dispatch(
      commentPost(finalComment, props.post._id)
    );
    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behaviour: "smooth", block: "end" });
  };

  return (
    <div>
      <div className={classes.commentSectionOuterContainer}>
        <div className={classes.commentSectionInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>&nbsp;:&nbsp;{c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user && (
          <div style={{ width: "60%" }}>
            <Typography gutterBottom variant="h6">
              Leave a Comment
            </Typography>
            <TextField
              rows={4}
              multiline
              variant="outlined"
              label="Comment"
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              fullWidth
              color="primary"
              disabled={!comment}
              onClick={submitHandler}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
