import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/app/actions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const CreateSurvey = () => {
  const [subject, setSubject] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/survey",
        { subject },
        {
          headers: { authorization: localStorage.getItem("token") },
        }
      );
      console.log(data);
      history.push("/home");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading());
    }
  };

  return (
    <div className="create-post">
      <h1>Create a new survey</h1>
      <textarea
        className="input"
        style={{ marginBottom: "0" }}
        rows="5"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter the subject for your survey..."
      />
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateSurvey;
