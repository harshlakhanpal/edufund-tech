import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/app/actions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const CreateSurvey = () => {
  const [subject, setSubject] = useState("");
  const [minAge, setMinAge] = useState("");
  const [genderSpecific, setGenderSpecific] = useState("all");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    setGenderSpecific(e.target.value);
  };

  const handleSubmit = async () => {
    dispatch(setLoading());
    try {
      const { data } = await axios.post(
        "/api/survey",
        {
          subject,
          minAge: minAge.trim() === "" ? 18 : Number(minAge),
          genderSpecific,
        },
        {
          headers: { authorization: JSON.parse(localStorage.getItem("token")) },
        }
      );
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
        toast.success("Survey created successfully!", {
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
    <div className="create-post">
      <h1>Create a new survey</h1>
      <textarea
        className="input"
        rows="12"
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter the subject for your survey..."
      />
      <input
        className="input"
        type="number"
        name="email"
        value={minAge}
        onChange={(e) => setMinAge(e.target.value)}
        placeholder="Set a minimum age(default-18)"
      />

      <select
        className="input select-field"
        name="genderSpecific"
        onChange={handleSelect}
      >
        <option value="all" selected hidden>
          Gender Specific(default-all)
        </option>
        <option value="all">All</option>

        <option key="male" value="male">
          Male
        </option>
        <option key="female" value="female">
          Female
        </option>
      </select>

      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default CreateSurvey;
