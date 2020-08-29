import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setLoading } from "../store/app/actions";

const AnswerSurvey = () => {
  const [survey, setSurvey] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();
  const [body, setBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const fetchSurvey = async () => {
    const { data } = await axios.get(`/api/survey/${id}`);
    //  console.log(data);
    setSurvey(data);
  };
  useEffect(() => {
    fetchSurvey();
  }, []);

  const handleResponse = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    if (body.trim() === "") {
      toast.error("Cannot submit empty response", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
      return;
    }
    survey.responses.unshift({
      body,
      userId,
      createdAt: new Date().toISOString(),
    });
    dispatch(setLoading());

    try {
      const { data } = await axios.put(`/api/survey/${id}`, { ...survey });
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
        toast.success("Response submitted successfully!", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        history.push("/home");
      }
    } finally {
      dispatch(setLoading());
    }
  };

  return (
    <section className="post-page">
      <div>
        {survey && (
          <>
            <div className="card">
              <div className="card-content">
                <div style={{ fontSize: "1.65rem" }}>{survey.subject}</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "1rem",
                  }}
                >
                  <p style={{ textAlign: "end" }}>
                    {`Posted by ${survey.username}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="textarea-container">
              <textarea
                className="input"
                style={{ marginBottom: "0" }}
                rows="4"
                placeholder="Type your answer here."
                value={body}
                onChange={handleBodyChange}
              ></textarea>
              <button className="btn" onClick={handleResponse}>
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default AnswerSurvey;
