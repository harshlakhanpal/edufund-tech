import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/app/actions";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user")) history.push("/home");
  }, []);

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
  //   console.log(values);

  const handleRegister = async () => {
    dispatch(setLoading());

    try {
      const { data } = await axios.post("/auth/register", {
        ...values,
      });
      if (data.error) {
        //   console.log(data.error);
        toast.error(data.error, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } else {
        toast.success("Registration successful!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });

        setTimeout(() => history.push("/login"), 500);
      }
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
      <div
        style={{
          display: "flex",

          color: "black",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "1.65rem" }}>Gender:</span>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleInputChange}
          />
          <span style={{ display: "inline-block" }}>Male</span>
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleInputChange}
          />
          <span style={{ display: "inline-block" }}>Female</span>
        </label>
      </div>
      <input
        className="input"
        type="number"
        name="age"
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
      <div style={{ display: "inline-block", color: "black" }}>
        <input type="checkbox" defaultChecked={false} onChange={handleCheck} />{" "}
        <span style={{ fontSize: "1.20rem" }}>Register as coordinator</span>
      </div>
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
