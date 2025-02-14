import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setLoading } from "../store/app/actions";

import viewArrow from "../assets/icons/view-arrow.svg";

const MySurveys = () => {
  const [surveys, setSurveys] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchSurveys = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.get("/api/mysurveys", {
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

  return (
    <section className="home">
      <h1 style={{ textAlign: "center", fontSize: "2.6rem" }}>My Surveys</h1>
      {surveys.length > 0 &&
        surveys.map(({ responses, subject, createdAt, _id }) => (
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
                <p>{moment(createdAt).fromNow()}</p>
                <p>{responses.length}</p>
              </div>
            </div>
            <div
              className="action"
              onClick={() => history.push(`/home/mysurveys/${_id}`)}
            >
              <img src={viewArrow} alt="View post" className="icon" />
            </div>
          </div>
        ))}
    </section>
  );
};

export default MySurveys;
