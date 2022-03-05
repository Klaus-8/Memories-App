import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { Delete, MoreHoriz } from "@material-ui/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../state/actions/postAction";
import useStyles from "./Post.styles";
import LikeButton from "./LikeButton";

const Post = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.googleId || user?.result?._id;
  const [likes, setLikes] = useState(props.post.likes);
  const hasAlreadyLiked = props.post.likes.find((likeId) => likeId === userId);

  const editClickHandler = () => {
    props.setCurrentId(props.post._id);
  };

  const deleteClickHandler = () => {
    dispatch(deletePost(props.post._id));
    navigate("/");
  };

  const likeClickHandler = async () => {
    dispatch(likePost(props.post._id));

    if (hasAlreadyLiked) {
      setLikes(likes.filter((likeId) => likeId !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = () => {
    navigate(`/posts/${props.post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        component="span"
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={props.post.imageFile}
          title={props.post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{props.post.name}</Typography>
          <Typography variant="body2">
            {moment(props.post.createdAt).fromNow()}
          </Typography>
        </div>
      </ButtonBase>
      {(user?.result?.googleId || user?.result?._id) === props.post.creator && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={editClickHandler}
          >
            <MoreHoriz fontSize="medium" />
          </Button>
        </div>
      )}
      <ButtonBase
        className={classes.cardAction}
        component="span"
        onClick={openPost}
      >
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {props.post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {props.post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.post.message.split(" ").splice(0, 20).join(" ")}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={user?.result ? false : true}
          onClick={likeClickHandler}
        >
          <LikeButton post={props.post} likes={likes} />
        </Button>
        {(user?.result?.googleId || user?.result?._id) ===
          props.post.creator && (
          <Button size="small" color="secondary" onClick={deleteClickHandler}>
            <Delete fontSize="small" />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
