const jwt = require("jsonwebtoken");

const jsonWebTokenMiddleware = (req, res, next) => {
  // Get the token from the request headers, query parameters, or cookies

  const token =
    req.headers.authorization || req.query.token || req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, "pluto");
    req.user = decoded;
  console.log({decoded});
    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.log({"INVALIDO": error});
    return res.status(401).json({ message: "Invalid token", error });
  }
};
// garaofran@gmail.com
module.exports = jsonWebTokenMiddleware;
