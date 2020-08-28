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
    const { data } = await axios.get(`http://localhost:5000/api/survey/${id}`);
    console.log(data);
    setSurvey(data);
  };
  useEffect(() => {
    fetchSurvey();
  }, []);

  const handleResponse = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    survey.responses.unshift({
      body,
      userId,
      createdAt: new Date().toISOString(),
    });
    dispatch(setLoading());

    try {
      await axios.put(`http://localhost:5000/api/survey/${id}`, { ...survey });
      setTimeout(() => history.push("/home"), 500);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading());
    }
    console.log(survey);
  };

  return (
    <section className="post-page">
      {/* {loading && <Loader />} */}
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
              {/* <div className="actions">
                 {user && user.username === post.username && (
                   <span onClick={postDelete}>
                     <img src={del} alt="Delete Post" className="icon" />
                   </span>
                 )}
                 <span className="like" onClick={toggleLike}>
                   {true &&
                   postLikes.some((one) => one.username === user.username) ? (
                     <img
                       src={filledHeart}
                       alt="Like/Unlike Post"
                       className="icon"
                     />
                   ) : (
                     <img
                       src={emptyHeart}
                       alt="Like/Unlike Post"
                       className="icon"
                     />
                   )}
                 </span>
               </div> */}
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
            {/* {post.comments &&
               post.comments.length > 0 &&
               post.comments.map(({ body, id, username }) => (
                 <div className="comment">
                   <span style={{ wordBreak: "break-all" }}>{body}</span>
                   {user && user.username === username && (
                     <span
                       style={{ alignSelf: "flex-end" }}
                       onClick={async () => {
                         await setCommentID(id);
                         commentDelete();
                       }}
                     >
                       <img src={del} alt="Delete comment" className="icon" />
                     </span>
                   )}
                 </div>
               ))} */}
          </>
        )}
      </div>
    </section>
  );
};

export default AnswerSurvey;
