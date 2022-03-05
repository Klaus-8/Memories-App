import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-app-fast-api.herokuapp.com/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `BEARER ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

const fetchData = (pageNumber) => API.get(`/posts?page=${pageNumber}`);
const fetchDataBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.searchTitle || "none"}&tags=${
      searchQuery.searchTags
    }`
  );
const fetchOne = (id) => API.get(`/posts/${id}`);
const insertData = (newPost) => API.post("/posts", newPost);
const updateData = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
const deleteData = (id) => API.delete(`/posts/${id}`);
const likeData = (id) => API.patch(`/posts/${id}/likePost`);
const commentData = (comment, id) =>
  API.post(`/posts/${id}/commentPost`, { comment });

const signIn = (formData) => API.post("/users/signin", formData);
const signUp = (formData) => API.post("/users/signup", formData);

export {
  fetchData,
  fetchDataBySearch,
  fetchOne,
  insertData,
  updateData,
  deleteData,
  likeData,
  commentData,
  signIn,
  signUp,
};
