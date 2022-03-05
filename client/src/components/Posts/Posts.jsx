import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import useStyles from "./Posts.styles";

const Posts = (props) => {
  const classes = useStyles();
  const { posts, isLoading, isDark } = useSelector(
    (state) => state.postReducer
  );

  if (!posts.length && !isLoading) return "No Posts !!";

  return (
    <>
      {isLoading ? (
        <CircularProgress
          className={
            isDark ? classes.progressCircleDark : classes.progressCircleLight
          }
          size="4rem"
        />
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={props.setCurrentId} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
