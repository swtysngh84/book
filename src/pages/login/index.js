import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";

import { validateEmail, isValidPassword } from "../../helper/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../../slice/loginSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  signup: {
    color: "#1976d2",
    textDecoration: "none",
  },
}));

const LoginPage = () => {
  const style = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    const { email, password } = value;
    if (!email) {
      error.email = "Please enter a email address.";
    } else if (!validateEmail(email)) {
      error.email =
        "Please enter a valid email address (e.g., user@example.com).";
    } else {
      error.email = "";
    }
    if (!password) {
      error.password = "Please enter a password.";
    } else if (!isValidPassword(password)) {
      error.password =
        "Your password needs to be at least 8 characters, contain an uppercase letter, a lowercase letter, a number and one of the following symbols: ! @ £ $ % _ - ( ) [ ] ~ ; : ? . ^ & * + = ` #.";
    } else {
      error.password = "";
    }
    setError({ ...error });
    if (!error.email && !error.password) {
      dispatch(login(value)).then((data) => {
        if (!data.error) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className={style.container}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 1,
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "100%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            value={value.email}
            error={!!error.email}
            helperText={error.email}
            id="email"
            label="Email Address"
            name="email"
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={value.password}
            error={!!error.password}
            helperText={error.password}
            name="password"
            label="Password"
            id="password"
            onChange={onChange}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={user?.isLoading}
          >
            Sign In
          </Button>
        </Box>
        <p>
          {" "}
          Don't have an account?{" "}
          <Link to="/signup" className={style.signup}>
            Sign up
          </Link>{" "}
        </p>
      </Box>
    </div>
  );
};

export default LoginPage;
