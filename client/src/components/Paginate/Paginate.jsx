import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./Paginate.styles";
import { getPosts } from "../../state/actions/postAction";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageNumber = Number(page);
  const { totalPages } = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (pageNumber) dispatch(getPosts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages}
      page={pageNumber || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
