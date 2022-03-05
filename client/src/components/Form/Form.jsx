import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost, updatePost } from "../../state/actions/postAction";
import useStyles from "./Form.styles";

const Form = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const post = useSelector((state) =>
    props.currentId
      ? state.postReducer.posts.find((p) => p._id === props.currentId)
      : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    imageFile: "",
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const submitHandler = (event) => {
    if (props.currentId) {
      dispatch(
        updatePost(props.currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }

    clear();
    event.preventDefault();
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: name === "tags" ? value.split(",") : value,
    });
  };

  const imageFileHandler = (event) => {
    const { base64 } = event;
    setPostData({
      ...postData,
      imageFile: base64,
    });
  };

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: [],
      imageFile: "",
    });
    props.setCurrentId(null);
  };

  return user?.result ? (
    <Paper className={classes.paper} elevation={6}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={submitHandler}
      >
        <Typography variant="h6">
          {props.currentId ? "Edit your" : "Create a"} Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={inputHandler}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={inputHandler}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (comma separated)"
          fullWidth
          value={postData.tags}
          onChange={inputHandler}
        />
        <div className={classes.fileInput}>
          <FileBase
            name="inputFile"
            type="file"
            multiple={false}
            onDone={imageFileHandler}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="text"
          color="secondary"
          size="small"
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  ) : (
    <Paper className={classes.paper} elevation={6}>
      <Typography variant="h6">
        Please, Sign In to like other's memories and share your memories.
      </Typography>
    </Paper>
  );
};

export default Form;
