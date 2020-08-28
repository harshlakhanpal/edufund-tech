import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/app/actions";
import { useHistory } from "react-router-dom";

import Loader from "./Loader";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({});

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

  const handleInputChange = (e) =>
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });

  const handleCheck = async () => {
    await setValues({
      ...values,
      isCoordinator: !values.isCoordinator,
    });
  };
  console.log(values);

  const handleRegister = async () => {
    dispatch(setLoading());

    //  const { email, name, password, confirmPassword } = values;
    try {
      await axios.post("http://localhost:5000/auth/register", {
        ...values,
      });

      setTimeout(() => history.push("/login"), 500);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading());
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="input"
        name="name"
        value={values.name}
        onChange={handleInputChange}
        placeholder="Enter your Name"
      />
      <input
        className="input"
        name="email"
        value={values.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />
      <div style={{ display: "inline-block", color: "black" }}>
        Gender
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleInputChange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleInputChange}
        />
        Female
      </div>
      <input
        className="input"
        type="number"
        value={values.age}
        onChange={handleInputChange}
        placeholder="Enter your Age"
      />
      <input
        className="input"
        name="password"
        type="password"
        value={values.password}
        //   onPressEnter={handleRegister}
        onChange={handleInputChange}
        placeholder="Enter your password"
      />
      <input
        className="input"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        //   onPressEnter={handleRegister}
        onChange={handleInputChange}
        placeholder="Confirm your password"
      />
      <input type="checkbox" defaultChecked={false} onChange={handleCheck} />{" "}
      Register as a coordinator!
      <br />
      <span onClick={() => history.push("/login")} className="link">
        Already a member ? Login here
      </span>
      <br />
      <button className="btn" onClick={handleRegister}>
        Register
      </button>
      <br />
    </div>
  );
};

export default Register;
