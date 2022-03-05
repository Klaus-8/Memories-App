import React from "react";
import { IconButton, InputAdornment, TextField, Grid } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Input = ({
  name,
  type,
  label,
  half,
  inputHandler,
  showPasswordHandler,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        type={type}
        label={label}
        autoFocus={name === "firstName" ? true : false}
        onChange={inputHandler}
        InputProps={
          name === ("password" || "confirmPassword")
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPasswordHandler}>
                      {type === "password" ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
        fullWidth
        variant="outlined"
        autoComplete="off"
        required
      />
    </Grid>
  );
};

export default Input;
