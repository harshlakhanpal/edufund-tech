const jwt = require("jsonwebtoken");

const checkAuth = (auth) => {
  const token = auth;

  if (token !== "") {
    try {
      const user = jwt.verify(token, "mysecret");

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = checkAuth;
