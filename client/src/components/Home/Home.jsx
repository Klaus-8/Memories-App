import React, { useState } from "react";
import {
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Chip,
  Container,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../state/actions/postAction";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate/Paginate";
import useStyles from "./Home.styles";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchTagsArr, setSearchTagsArr] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page");
  const searchQuery = query.get("searchQuery");

  const searchPost = () => {
    if (searchTitle.trim() || searchTagsArr.length !== 0) {
      const searchObject = {
        searchTitle,
        searchTags: searchTagsArr.join(","),
      };
      dispatch(getPostsBySearch(searchObject));
      navigate(
        `/posts/search?searchQuery=${
          searchTitle || "none"
        }&tags=${searchTagsArr.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  const keyPressSearchHandler = (event) => {
    if (event.charCode === 13) {
      searchPost();
    }
  };

  const searchTagHandler = (event) => {
    setSearchTag(event.target.value);
  };

  const addTagHandler = () => {
    if (searchTag) {
      setSearchTagsArr((prevTags) => [...prevTags, searchTag]);
    }
    setSearchTag("");
  };

  const deleteTaghandler = (tag) => {
    setSearchTagsArr((prevTags) => prevTags.filter((t) => t !== tag));
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="searchTitle"
                label="Search Memory"
                variant="outlined"
                fullWidth
                value={searchTitle}
                autoComplete="off"
                onChange={(event) => setSearchTitle(event.target.value)}
                onKeyPress={keyPressSearchHandler}
              />
              <Paper component="ul" className={classes.ul} elevation={0}>
                {searchTagsArr.map((tag, index) => {
                  return tag ? (
                    <li key={index}>
                      <Chip
                        className={classes.chip}
                        label={tag}
                        onDelete={() => deleteTaghandler(tag)}
                      />
                    </li>
                  ) : null;
                })}
              </Paper>
              <TextField
                name="searchTags"
                label="Search By Tags"
                variant="outlined"
                fullWidth
                value={searchTag}
                onChange={searchTagHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={addTagHandler}>
                        <Add />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                className={classes.searchButton}
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                onClick={searchPost}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page ? page : 1} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
