import { Box, Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../Context/User";
var bcrypt = require("bcryptjs");

const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      window.alert("Please enter credentials");
      return;
    }

    const { data } = await axios.get(
      `http://localhost:8000/user?email=${email}`
    );
    if (data.length === 0) {
      window.alert("user doesn't exist");
      return;
    } else {
      if (bcrypt.compareSync(password, data[0].hashedPassword)) {
        window.alert("user logged in");
        setUser(data[0]);
        console.log(data[0])
        localStorage.setItem("user",JSON.stringify(data[0]));
        handleClose();
      } else {
        window.alert("incorrect password");
      }
    }
  };

  return (
    <Box
      p={3}
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
      onKeyPress={handleKeyPress}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      ></TextField>

      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>

      <Button
        variant="contained"
        size="large"
        type="submit"
        style={{ backgroundColor: "red" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
