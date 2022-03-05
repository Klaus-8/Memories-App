import {
  CREATE,
  READ_POSTS,
  READ_SEARCH_POSTS,
  READ_POST,
  UPDATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  DARK_MODE_TOGGLE,
} from "../constants/actionTypes";

const reducer = (
  state = { isDark: false, isLoading: true, posts: [], post: null },
  action
) => {
  switch (action.type) {
    case CREATE:
      return state;

    case READ_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };

    case READ_SEARCH_POSTS:
      return { ...state, posts: action.payload };

    case READ_POST:
      return { ...state, post: action.payload };

    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return state;

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case DARK_MODE_TOGGLE:
      return { ...state, isDark: action.payload };

    default:
      return state;
  }
};

export default reducer;
