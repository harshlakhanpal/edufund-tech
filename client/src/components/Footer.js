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
      {checkCoordinator && (
        <div
          className="mysurveys"
          onClick={() =>
            location.pathname !== "/home/create_survey"
              ? history.push("/home/create_survey")
              : null
          }
        >
          <img
            src={add}
            style={{ height: "3.4rem", width: "3.4rem" }}
            alt="Add survey"
            className="icon"
          />
        </div>
      )}
    </>
  );
};

export default Footer;
