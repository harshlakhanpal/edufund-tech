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
    const { data } = await axios.get(`/api/survey/${id}`);
    //  console.log(data);
    setSurvey(data);
  };
  useEffect(() => {
    fetchSurvey();
  }, []);

  const handleResponseDelete = async (_id) => {
    survey.responses = survey.responses.filter((resp) => resp.id !== _id);
    //  console.log(survey);
    dispatch(setLoading());

    try {
      await axios.put(`/api/survey/${id}`, { ...survey });
      await setSurvey(survey);
      toast.success("Response deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } finally {
      dispatch(setLoading());
    }
    //  console.log(survey);
  };

  return (
    <section className="post-page">
      <div>
        {survey && (
          <>
            <div className="my-title">{survey.subject} </div>

            <hr />
            <p
              className="link"
              style={{ textAlign: "center", marginBottom: "2px" }}
            >
              Responses
            </p>

            {survey.responses && survey.responses.length > 0 ? (
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
              ))
            ) : (
              <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
                No responses yet.
              </h1>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ViewMySurvey;
