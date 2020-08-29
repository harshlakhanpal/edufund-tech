import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginAction, setLoading } from "../store/app/actions";

import Loader from "./Loader";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user")) history.push("/home");
  }, []);

  const handleLogin = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } else {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        await dispatch(loginAction(data));
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(data));

        history.push("/home");
      }
    } finally {
      dispatch(setLoading());
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="input"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <input
        className="input"
        name="password"
        type="password"
        value={password}
        //   onPressEnter={handleLogin}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <br />
      <span onClick={() => history.push("/register")} className="link">
        Not a member? Register here.
      </span>
      <br />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>
      <br />
    </div>
  );
};

export default Login;
