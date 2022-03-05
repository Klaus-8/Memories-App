import {
  CREATE,
  READ_POSTS,
  READ_SEARCH_POSTS,
  READ_POST,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../../api/index";

const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchOne(id);

    const action = {
      type: READ_POST,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};

const getPosts = (pageNumber) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchData(pageNumber);

    const action = {
      type: READ_POSTS,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};

const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchDataBySearch(searchQuery);

    const action = {
      type: READ_SEARCH_POSTS,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};

const createPost = (newPost, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.insertData(newPost);

    const action = {
      type: CREATE,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });

    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.error(error);
  }
};

const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateData(id, post);

    const action = {
      type: UPDATE,
      payload: data,
    };

    dispatch(action);
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.error(error);
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    await api.deleteData(id);

    const action = {
      type: DELETE,
      payload: id,
    };

    dispatch(action);
  } catch (error) {
    console.error(error);
  }
};

const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeData(id);

    const action = {
      type: UPDATE,
      payload: data,
    };

    dispatch(action);
  } catch (error) {
    console.error(error);
  }
};

const commentPost = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.commentData(comment, id);

    const action = {
      type: UPDATE,
      payload: data,
    };

    dispatch(action);

    return data.comments;
  } catch (error) {
    console.error(error);
  }
};

export {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
};
