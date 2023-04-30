import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Box,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  Collapse,
  Alert,
} from "@mui/material";

const AddBook = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  // media
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  const [book, setBook] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:8100/api/book/add", {
        book,
        author,
        desc,
      });

      toast.success("Book added successfully");

      //   localStorage.setItem("authToken", true);
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
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      //   backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <Typography variant="h3" color="rgba(100,150,255)">
        Add Book
      </Typography>
      {loggedIn ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Book Name"
              type="text"
              required
              margin="normal"
              fullWidth
              value={book}
              onChange={(e) => {
                setBook(e.target.value);
              }}
            />
            <TextField
              label="Author Name"
              type="text"
              required
              margin="normal"
              fullWidth
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
              }}
            />
            <TextField
              label="Description"
              type="text"
              margin="normal"
              multiline="true"
              fullWidth
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
            <Box display={"flex"} flexDirection={"row"}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ color: "white", mt: 2, mr: 2 }}
              >
                Submit
              </Button>
            </Box>
            {/* <Typography mt={2}>
          Don't have an account ? <Link to="/register">Register</Link>
        </Typography> */}
          </form>
        </>
      ) : (
        <Typography sx={{ margin: 5 }}>
          Login First! <Link to="/login">Login</Link>
        </Typography>
      )}
    </Box>
  );
};

export default AddBook;
