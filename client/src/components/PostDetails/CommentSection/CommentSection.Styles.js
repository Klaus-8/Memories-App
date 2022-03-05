import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  commentSectionOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentSectionInnerContainer: {
    height: "200px",
    width: "40%",
    overflowY: "auto",
    marginRight: "30px",
  },
}));
