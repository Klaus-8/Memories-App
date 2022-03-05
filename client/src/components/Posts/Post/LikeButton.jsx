import React from "react";
import { ThumbUpAlt, ThumbUpAltOutlined } from "@material-ui/icons";

const LikeButton = (props) => {
  const user = JSON.parse(localStorage.getItem("profile"))?.result;

  return props.likes.find(
    (likeId) => likeId === (user?.googleId || user?._id)
  ) ? (
    <>
      <ThumbUpAlt /> &nbsp;{" "}
      {props.likes.length > 1
        ? props.likes.length === 2
          ? `You and ${props.likes.length - 1} other`
          : `You and ${props.likes.length - 1} others`
        : `${props.likes.length} Like`}
    </>
  ) : (
    <>
      <ThumbUpAltOutlined /> &nbsp;
      {props.likes.length > 1
        ? `${props.likes.length} Likes`
        : props.likes.length === 0
        ? `Like`
        : `${props.likes.length} Like`}
    </>
  );
};

export default LikeButton;
