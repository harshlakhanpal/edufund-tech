import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { setLoading } from "../store/app/actions";

import viewArrow from "../assets/icons/view-arrow.svg";

const Home = () => {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchSurveys = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get("/api/surveys", {
        headers: { authorization: JSON.parse(localStorage.getItem("token")) },
      });

      // console.log(data);
      setSurveys(data);
    } finally {
      dispatch(setLoading());
    }
  };
  useEffect(() => {
    fetchSurveys();
  }, []);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const checkCoordinator = user ? user.isCoordinator : false;

  return (
    <section className="home">
      <h1 className="title">Surveys you are eligible for</h1>
      {checkCoordinator && <Redirect to="/home/mysurveys" />}
      {surveys.length > 0 ? (
        surveys.map(({ username, subject, createdAt, _id }) => (
          <div className="card">
            <div className="info">
              <p style={{ fontSize: "1.65rem", padding: "1.3rem" }}>
                {subject}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "1rem",
                }}
              >
                <p>{username}</p>
                <p>{moment(createdAt).fromNow()}</p>
              </div>
            </div>
            <div
              className="action"
              onClick={() => history.push(`/home/${_id}`)}
            >
              <img src={viewArrow} alt="View post" className="icon" />
            </div>
          </div>
        ))
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
          {" "}
          No more surveys left for you to respond to.
        </h1>
      )}
    </section>
  );
};

export default Home;
