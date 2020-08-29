import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import del from "../assets/icons/delete.svg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { setLoading } from "../store/app/actions";

const ViewMySurvey = () => {
  const [survey, setSurvey] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  let { id } = useParams();

  const fetchSurvey = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/survey/${id}`);
    console.log(data);
    setSurvey(data);
  };
  useEffect(() => {
    fetchSurvey();
  }, []);

  const handleResponseDelete = async (_id) => {
    survey.responses = survey.responses.filter((resp) => resp.id !== _id);
    console.log(survey);
    dispatch(setLoading());

    try {
      await axios.put(`http://localhost:5000/api/survey/${id}`, { ...survey });
      await setSurvey(survey);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading());
    }
    console.log(survey);
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

            {survey.responses &&
              survey.responses.map(({ body, createdAt, id }) => (
                <div className="comment">
                  <span style={{ wordBreak: "break-all" }}>{body}</span>

                  <span
                    style={{ alignSelf: "flex-end" }}
                    onClick={() => handleResponseDelete(id)}
                  >
                    <img src={del} alt="Delete comment" className="icon" />
                  </span>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
};

export default ViewMySurvey;
