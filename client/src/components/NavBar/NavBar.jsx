import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { ToggleButton } from "@material-ui/lab";
import { NightsStay, WbSunny } from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./NavBar.styles";
import memoriesLogo from "../assets/memories-Logo.png";
import memoriesText from "../assets/memories-Text.png";
import memoriesTextDark from "../assets/memories-Text-Dark.png";
import { LOGOUT, DARK_MODE_TOGGLE } from "../../state/constants/actionTypes";

const NavBar = () => {
  const classes = useStyles();
  const { isDark } = useSelector((state) => state.postReducer);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(isDark);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = useCallback(() => {
    const action = {
      type: LOGOUT,
      payload: null,
    };

    dispatch(action);
    window.location.reload();
    navigate("/");
  }, [dispatch, navigate]);

  const darkModeHandler = () => {
    setDarkMode((prevMode) => !prevMode);

    const action = {
      type: DARK_MODE_TOGGLE,
      payload: !darkMode,
    };

    dispatch(action);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedData = decode(token);

      if (decodedData.exp * 1000 < new Date().getTime()) {
        logOutHandler();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logOutHandler]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link className={classes.brandContainer} to="/">
        <img
          className={classes.image}
          src={isDark ? memoriesTextDark : memoriesText}
          alt="Website Header"
          height="45px"
        />
        <img
          className={classes.image}
          src={memoriesLogo}
          alt="Website Logo"
          height="40px"
        />
      </Link>
      <Toolbar>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.imageUrl}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              className={isDark ? classes.userNameDark : classes.userNameLight}
              variant="h6"
            >
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              type="submit"
              onClick={logOutHandler}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
        <ToggleButton
          className={classes.toggleButton}
          value={darkMode}
          onClick={darkModeHandler}
        >
          {darkMode ? <WbSunny /> : <NightsStay />}
        </ToggleButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
