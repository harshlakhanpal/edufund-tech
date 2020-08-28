import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

const AnswerSurvey = () => {
  const [survey, setSurvey] = useState({});
  const history = useHistory();
  let { id } = useParams();
  const [body, setBody] = useState("");
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const fetchSurvey = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/survey/${id}`,
      {}
    );
    console.log(data);
    setSurvey(data);
  };
  useEffect(() => {
    fetchSurvey();
  }, []);

  const handleResponse = async () => {
    const username = JSON.parse(localStorage.getItem("user")).name;
    survey.responses.unshift({
      body,
      username,
      createdAt: new Date().toISOString(),
    });

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
