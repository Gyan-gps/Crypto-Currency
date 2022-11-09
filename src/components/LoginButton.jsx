import {
  AppBar,
  Button,
  makeStyles,
  Modal,
  Tab,
  Tabs,
} from "@material-ui/core";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 400,
    color: "white",
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
  },
}));
const LoginButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, v) => {
    setValue(v);
  };
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        style={{ width: 80, height: 40, backgroundColor: "#FF0000" }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-aria-describedby="transition-modal-description"
        closeAfterTransition
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <div className={classes.box}>
          <AppBar
            position="static"
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
              <Tab label="login" />
              <Tab label="sign up" />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignUpForm handleClose={handleClose} />}
        </div>
      </Modal>
    </div>
  );
};

export default LoginButton;
