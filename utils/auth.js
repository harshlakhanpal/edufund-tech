const jwt = require("jsonwebtoken");

const checkAuth = (auth) => {
  const token = auth;
  //   console.log(token);

  if (token !== "") {
    try {
      const user = jwt.verify(token, "mysecret");
      // console.log(user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
};

module.exports = checkAuth;
