import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Box,
  useTheme,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  Collapse,
  Alert,
} from "@mui/material";

const Login = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const theme = useTheme();
  const navigate = useNavigate();
  // media
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8100/api/auth/login", {
        email,
        password,
      });

      toast.success("Login successfully");
      localStorage.setItem("authToken", true);
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      {loggedIn ? (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Typography variant="h4" color={"rgba(100,150,255)"}>
            <b> Hello User</b> <br />
            <Typography variant="h6" color={"rgba(100,150,255)"}>
              You are Logged In!!
            </Typography>
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Sign In</Typography>

            <TextField
              label="email"
              type="email"
              required
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              label="password"
              type="password"
              required
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Sign In
            </Button>

            <Typography mt={2}>
              Don't have an account ? <Link to="/register">Register</Link>
            </Typography>
          </form>
        </Box>
      )}
    </>
  );
};

export default Login;
