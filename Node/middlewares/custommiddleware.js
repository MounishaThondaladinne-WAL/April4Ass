module.exports = (req, res, next) => {
  if (req.params.name) {
    if (req.params.name === "danger") {
      console.log("came in error");
      res.send("you cannot send danger name");
    } /*else {
      console.log("came here");
      // pass the request to function handler
      next();
    }*/
    next();
  }
};
