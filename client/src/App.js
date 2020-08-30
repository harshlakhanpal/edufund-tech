import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import AnswerSurvey from "./components/AnswerSurvey";
import MySurveys from "./components/MySurveys";
import ViewMySurvey from "./components/ViewMySurvey";
import Footer from "./components/Footer";
import RestrictedRoute from "./components/RestrictedRoute";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Login from "./components/Login";
import Loader from "./components/Loader";
import CreateSurvey from "./components/CreateSurvey";
import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const App = () => {
  const loading = useSelector((state) => state.app.appLoading);

  if (process.env.NODE_ENV !== "production") {
    axios.defaults.baseURL = "http://localhost:5000/";
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        {loading && (
          <div className="loader-container">
            <div className="loader" />
          </div>
        )}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute
            exact
            path="/home/create_survey"
            component={CreateSurvey}
          />

          <RestrictedRoute exact path="/home/mysurveys" component={MySurveys} />
          <RestrictedRoute
            exact
            path="/home/mysurveys/:id"
            component={ViewMySurvey}
          />

          <PrivateRoute exact path="/home/:id" component={AnswerSurvey} />
          <PageNotFound />
        </Switch>
      </div>
      <Footer />
      <ToastContainer
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
        }}
      />
    </div>
  );
};

export default App;
