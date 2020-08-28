import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import add from "../assets/icons/Add.svg";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const checkCoordinator = user ? user.isCoordinator : false;

  return (
    <>
      {checkCoordinator ? (
        location.pathname !== "/home/create_survey" ? (
          <div
            className="footer"
            onClick={() => history.push("/home/create_survey")}
          >
            Create a new Survey
          </div>
        ) : (
          <div className="footer">Create a new Survey</div>
        )
      ) : null}
    </>
  );
};

export default Footer;
