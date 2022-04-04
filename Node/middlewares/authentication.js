const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  console.log("Came in middleware");
  const token = req.header("token");
  if (!token) {
    res.json({ status: 0, debug_msg: "Token not found" });
  }
  try {
    console.log("Came in try");
    const decodedToken = jwt.verify(token, "secret_string");
    console.log(decodedToken);
    next();
  } catch (err) {
    res.json({ status: 0, debug_msg: "Token sent is not valid" });
  }
};
