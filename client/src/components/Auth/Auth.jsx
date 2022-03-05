import React, { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoogleIcon from "./GoogleIcon";
import Input from "./Input";
import useStyles from "./Auth.styles";
import { signUp, signIn } from "../../state/actions/authAcions";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }

    event.preventDefault();
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const switchMode = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    const action = {
      type: "LOGIN",
      payload: { result, token },
    };

    try {
      dispatch(action);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Login Unsuccessful!!");
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  type="text"
                  label="First Name"
                  half
                  inputHandler={inputHandler}
                />
                <Input
                  name="lastName"
                  type="text"
                  label="Last Name"
                  half
                  inputHandler={inputHandler}
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email"
              inputHandler={inputHandler}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              inputHandler={inputHandler}
              showPasswordHandler={showPasswordHandler}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                label="Confirm Password"
                inputHandler={inputHandler}
                showPasswordHandler={showPasswordHandler}
              />
            )}
          </Grid>
          <Grid container justifyContent="center">
            <Button
              className={classes.submit}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>
          <Grid container justifyContent="center">
            <GoogleLogin
              clientId="200742122654-93rliqo00sjakm4v7l7igejbhl7a47k1.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  disabled={renderProps.disabled}
                  onClick={renderProps.onClick}
                >
                  {" "}
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </Grid>
        </form>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Auth;
