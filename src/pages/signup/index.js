import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validateEmail, isValidPassword } from "../../helper/validation";
import { signup } from "../../slice/loginSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  login: {
    color: "#1976d2",
    textDecoration: "none",
  },
}));

const SignUp = () => {
  const style = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, confirmPassword } = value;
    if (!name) {
      error.name = "Please enter name.";
    } else {
      error.name = "";
    }

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
    if (!confirmPassword) {
      error.confirmPassword = "Please enter confirm password.";
    } else if (confirmPassword !== password) {
      error.confirmPassword =
        "Confirm password does not match with the password";
    } else {
      error.confirmPassword = "";
    }
    setError({ ...error });
    if (
      !error.email &&
      !error.password &&
      !error.name &&
      !error.confirmPassword
    ) {
      dispatch(signup(value)).then((data) => {
        if (!data.error) {
          navigate("/login");
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
          // backgroudColor: "rgba(5, 7, 10, 0.4)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign Up
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
            id="Name"
            label="Name"
            name="name"
            value={value.name}
            error={!!error.name}
            helperText={error.name}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={value.email}
            error={!!error.email}
            helperText={error.email}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={value.password}
            error={!!error.password}
            helperText={error.password}
            onChange={onChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm password"
            type="password"
            id="confirmPassword"
            value={value.confirmPassword}
            error={!!error.confirmPassword}
            helperText={error.confirmPassword}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={user?.isLoading}
          >
            Sign Up
          </Button>
        </Box>
        <p>
          {" "}
          Already have an account?{" "}
          <Link to="/login" className={style.login}>
            Login
          </Link>{" "}
        </p>
      </Box>
    </div>
  );
};

export default SignUp;
