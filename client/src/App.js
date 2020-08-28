import React from "react";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Drawer from "./components/Drawer";
// import Home from "./components/Home";
import Login from "./components/Login";
// import Register from "./components/Register";
import PageNotFound from "./components/PageNotFound";
// import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Drawer />

      <div className="content">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/register" component={Register} /> */}
          {/* <PrivateRoute exact path="/home" component={Home} /> */}

          <PageNotFound />
        </Switch>
      </div>
      <Footer />
      <ToastContainer
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

export default App;
