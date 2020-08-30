import React from "react";

import { useHistory } from "react-router-dom";

const Landing = () => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      {" "}
      <h1 className="title">Welcome</h1>
      <div style={{ display: "block", marginTop: "1rem" }}>
        <button className="btn" onClick={() => history.push("/login")}>
          Login
        </button>
        <button className="btn" onClick={() => history.push("/register")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Landing;
