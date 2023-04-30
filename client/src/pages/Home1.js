import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Box, useMediaQuery } from "@mui/material";
import { toast } from "react-hot-toast";
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import useFetch from "../fetch/useFetch";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "60vw",
  },
}));

const Home1 = () => {
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const isNotMobile = useMediaQuery("(min-width:1000px)");

  const [products, setProducts] = React.useState([]);
  const [key, setKey] = React.useState("");
  const { data, loading, error } = useFetch(
    `http://localhost:8100/api/book/search?key=${key}`
  );

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:8100/api/book/get");
    const products = data;
    setProducts(products);
    console.log(products);
  };
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, e) => {
    await axios
      .delete(`http://localhost:8100/api/book/delete/${id}`)
      .then((res) => {
        console.log(res);
        fetchProducts();
      });
  };

  return (
    <>
      <Box
        width={isNotMobile ? "70%" : "90%"}
        m={"2rem auto"}
        borderRadius={2}
        sx={{ boxShadow: 5 }}
        padding={2}
        display={"flex"}
        flexDirection={"row"}
        color={"rgba(255,255,255)"}
        className="heading1"
        justifyContent={"center"}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search.."
            value={key}
            onChange={(e) => {
              setKey(e.target.value);
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      <Box
        width={isNotMobile ? "70%" : "90%"}
        m={"2rem auto"}
        borderRadius={2}
        sx={{ boxShadow: 5 }}
        padding={2}
        display={"flex"}
        flexDirection={"row"}
        color={"rgba(255,255,255)"}
        className="heading1"
        marginBottom={"0rem"}
      >
        <Typography
          variant="h5"
          sx={{
            ml: 5,
            width: "45%",
          }}
        >
          <b>Book Name</b>
        </Typography>
        <Typography variant="h5">
          <b>Author</b>
        </Typography>
      </Box>

      <Box
        width={isNotMobile ? "70%" : "90%"}
        p={"1rem"}
        m={"2rem auto"}
        borderRadius={2}
        sx={{ boxShadow: 5, mt: 1 }}
      >
        {loading ? (
          <h3>Loading ....</h3>
        ) : (
          <>
            {data.length != 0 ? (
              <>
                <>
                  {data.map((product) => (
                    <Box marginBottom={2}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          // expandIcon={<del />}
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              width: "40%",
                              // overflow: "clip",
                              // flexShrink: 0,
                              color: "rgb(100,150,255)",
                              pl: 0,
                            }}
                          >
                            <b>{product.book}</b>
                          </Typography>
                          <Typography sx={{ width: "60%" }}>
                            <i>
                              <b>{product.author}</b>
                            </i>
                          </Typography>

                          {loggedIn ? (
                            <>
                              <IconButton
                                // sx={{ width: "1%" }}
                                size="large"
                                color="inherit"
                                onClick={(e) => {
                                  if (
                                    window.confirm(
                                      "Are you sure You want to delete this book?"
                                    )
                                  ) {
                                    handleDelete(product._id, e);
                                  }
                                }}
                              >
                                <Badge color="error">
                                  <DeleteSweep />
                                </Badge>
                              </IconButton>
                            </>
                          ) : (
                            <></>
                          )}
                        </AccordionSummary>

                        <AccordionDetails>
                          <Typography
                            variant="h9"
                            sx={{ color: "text.secondary" }}
                          >
                            {product.desc}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ))}
                </>
              </>
            ) : (
              <>
                {products.map((product) => (
                  <Box marginBottom={2}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        // expandIcon={<del />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography
                          sx={{
                            width: "40%",
                            // overflow: "clip",
                            // flexShrink: 0,
                            color: "rgb(100,150,255)",
                            pl: 0,
                          }}
                        >
                          <b>{product.book}</b>
                        </Typography>
                        <Typography sx={{ width: "60%" }}>
                          <i>
                            <b>{product.author}</b>
                          </i>
                        </Typography>

                        {loggedIn ? (
                          <>
                            <IconButton
                              // sx={{ width: "1%" }}
                              size="large"
                              color="inherit"
                              onClick={(e) => {
                                if (
                                  window.confirm(
                                    "Are you sure You want to delete this book?"
                                  )
                                ) {
                                  handleDelete(product._id, e);
                                }
                                // const ans = alert(
                                //   "Are you sure You want to delete this book ?"
                                // );
                                // handleDelete(product._id, e);
                              }}
                            >
                              <Badge color="error">
                                <DeleteSweep />
                              </Badge>
                            </IconButton>
                          </>
                        ) : (
                          <></>
                        )}
                      </AccordionSummary>

                      <AccordionDetails>
                        <Typography
                          variant="h9"
                          sx={{ color: "text.secondary" }}
                        >
                          <i>Publisher : {product.desc}</i>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default Home1;
