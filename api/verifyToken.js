const jwt = require("jsonwebtoken");

const  verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);

    //user represents the data in res in case there is no error
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(401).json("Token is not valid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    //not authenticated 401
    res.status(401).json("You are not authenticated");
  }
};

module.exports = verify;
