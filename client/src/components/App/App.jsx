import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import Auth from "../Auth/Auth";
import PostDetails from "../PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const { isDark } = useSelector((state) => state.postReducer);
  const theme = createTheme({
    palette: {
      type: isDark ? "dark" : "light",
    },
  });

  useEffect(() => {
    document.getElementById("mainBody").classList.toggle("darkMode");
  }, [isDark]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container maxWidth="xl">
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route
              path="/auth"
              element={!user ? <Auth /> : <Navigate replace to="/posts" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
