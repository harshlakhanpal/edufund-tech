import React from "react";
import { Redirect, Route } from "react-router-dom";

const RestrictedRoute = ({
  component: MyComponent = null,
  render: MyRender = null,
  ...rest
}) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const checkCoordinator = user ? user.isCoordinator : false;
  return (
    <Route
      {...rest}
      render={(props) =>
        checkCoordinator ? (
          MyRender ? (
            MyRender(props)
          ) : MyComponent ? (
            <MyComponent {...props} />
          ) : null
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};
export default RestrictedRoute;
