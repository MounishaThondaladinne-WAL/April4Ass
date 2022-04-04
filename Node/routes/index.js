var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send("welcome to home page");
});
router.get("/students", (req, res) => {
  let students = ["karuna", "bindu", "mounisha"];
  res.json(students);
});
router.get("/student", (req, res) => {
  let studentObj = { name: "karuna", city: "hyderabad" };
  res.json(studentObj);
});
router.get("/fibonacci", (req, res, next) => {
  const number = 10;
  let a = 0,
    b = 1,
    nextTerm;
  let fibArr = [];
  console.log("Fibonacci Series:");

  for (let i = 1; i <= number; i++) {
    fibArr.push(a);
    nextTerm = a + b;
    a = b;
    b = nextTerm;
  }
  res.json(fibArr);
});
router.get("/fibanocci/:min/:max", (req, res) => {
  let array = [];
  let minimum = req.params.min;
  let maximum = req.params.max;
  let n1 = 0;
  n2 = 1;
  n3 = 1;
  let temp = 0;
  while (n1 <= maximum) {
    if (n1 >= minimum) {
      temp++;
      array.push(n1);
    }
    n1 = n2;
    n2 = n3;
    n3 = n1 + n2;
  }
  res.json(array);
});
module.exports = router;
