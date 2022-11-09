import {
  AppBar,
  Typography,
  Container,
  makeStyles,
  Button,
  ThemeProvider,
  createTheme,
  Box,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/User";
import LoginButton from "./LoginButton";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    padding: 15,
  },
  title: {
    flex: 1,
    fontWeight: "bold",
  },
  user:{
  marginRight: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  }
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { user, setUser } = useUser();
  
  
  const handleLogout = () => {
    setUser();
    localStorage.setItem("user","");
  };
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container className={classes.container}>
            <Typography
              variant="h6"
              className={classes.title}
              onClick={() => navigate("/")}
            >
              Crypto
            </Typography>
            {user ? (
              <>
                <Box variant="h7" className={classes.user}>Welcome {user.email}</Box>
                <Button
                  variant="contained"
                  style={{ width: 80, height: 40, backgroundColor: "#FF0000" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <LoginButton />
            )}
          </Container>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Header;
