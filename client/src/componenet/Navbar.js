import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Add from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
// import toast from "react-hot-toast";
// import Toast from "react-hot-toast";
// import { toast } from "react-toastify";
import axios from "axios";
import useFetch from "../fetch/useFetch";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
// import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  const addBook = () => {
    navigate("/add");
  };
  const clickmenu = () => {
    navigate("/");
  };
  const clicklogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios
        .post("http://localhost:8100/api/auth/logout")
        .then(localStorage.removeItem("authToken"));
      window.alert("Logout SuccessFully!!");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [key, setKey] = React.useState("");
  const { data, error } = useFetch(
    `http://localhost:8100/api/book/search?key=${key}`
  );

  // const [myOptions, setMyOptions] = React.useState([]);

  const menuId = "primary-search-account-menu";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={clickmenu}
            >
              <MenuIcon />

              <Typography
                variant="h4"
                ml={2}
                noWrap
                component="div"
                sx={{ display: { xs: "1px", sm: "block" } }}
              >
                BookList
              </Typography>
            </IconButton>
          </>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={addBook}
            >
              <Badge color="error">
                <Add />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => {
                if (!loggedIn) {
                  window.alert("Login First!!");
                } else {
                  navigate("/");
                }
              }}
            >
              <Badge color="error">
                <DeleteSweep />
              </Badge>
            </IconButton>

            {loggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={clicklogin}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
