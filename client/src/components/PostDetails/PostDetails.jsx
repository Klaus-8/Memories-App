import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPost, getPostsBySearch } from "../../state/actions/postAction";
import useStyles from "./PostDetails.styles";
import CommentSection from "./CommentSection/CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.postReducer);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(
      getPostsBySearch({
        searchTitle: "none",
        searchTags: post?.tags.join(","),
      })
    );
  }, [dispatch, post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper className={classes.loadingPaper} elevation={6}>
        <CircularProgress className={classes.circleProgress} size="7rem" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter((p) => p._id !== post._id);

  const openPost = (id) => navigate(`/posts/${id}`);

  return (
    <Paper className={classes.mainPaper} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography gutterBottom variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">
            Memory from <strong>{post.name.split(" ")[0]}</strong>
          </Typography>
          <Typography gutterBottom variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.imageFile}
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You may also like :
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map((rp) => (
              <Paper
                key={rp._id}
                className={classes.recommendedPostPaper}
                elevation={6}
              >
                <div
                  key={rp._id}
                  className={classes.recommendedPostsList}
                  onClick={() => openPost(rp._id)}
                >
                  <Typography gutterBottom variant="h6">
                    {rp.title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {rp.name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {rp.message.split(" ").splice(0, 20).join(" ")}...
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes : {rp.likes.length}
                  </Typography>
                  <img src={rp.imageFile} alt={rp.title} width="200px" />
                </div>
              </Paper>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
