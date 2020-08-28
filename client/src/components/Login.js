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

  //   let [userLogin, { called, loading, data, error }] = useMutation(login, {
  //     variables: { username, password },
  //     pollInterval: 0,
  //     onCompleted: (data) => {
  //       dispatch(loginAction(data.login));
  //       localStorage.setItem("token", JSON.stringify(data.login.token));
  //       localStorage.setItem("user", JSON.stringify(data.login));
  //       history.push("/home");
  //       toast.success(`You are now logged in}`, {
  //         position: "top-center",
  //         autoClose: 1500,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //       });
  //     },

  //     onError: (error) => {
  //       console.log(error);
  //       toast.error("Please enter your credentials again.", {
  //         position: "top-center",
  //         autoClose: 1500,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: false,
  //       });
  //     },
  //   });

  const handleLogin = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      dispatch(loginAction(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data));

      console.log(data);

      setTimeout(() => history.push("/home"), 500);
    } catch (err) {
      console.log(err);
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
