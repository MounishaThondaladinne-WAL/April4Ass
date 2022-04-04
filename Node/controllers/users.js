const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticationMiddleware = require("../middlewares/authentication");
const connector = require("../poolconnect");
exports.createTable = (req, res) => {
  const sql =
    "CREATE TABLE user(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(30), email VARCHAR(40), password VARCHAR(200), age INT, dob DATE )";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
};
exports.getUsers = [
  authenticationMiddleware,
  (req, res) => {
    const sql = "SELECT * FROM user";
    connector.query(sql, (err, results, fields) => {
      if (err) {
        res.json(err);
      } else {
        res.json(results);
      }
    });
  },
];
exports.createUser = (req, res) => {
  const { name, email, password, age, dob } = req.body;
  let encryptedPassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    encryptedPassword = bcrypt.hashSync(password, salt);
  } catch (err) {
    console.log(err);
  }
  const checkingEmail = "SELECT * FROM user WHERE email=?";
  connector.query(checkingEmail, [email], (err, results, fields) => {
    if (err) {
      res.json(err);
    } else {
      if (results.length > 0) {
        res.json({ status: 0, debug_data: "Email already exists" });
      } else {
        const sql =
          "INSERT INTO user(name,email,password,age,dob) VALUES(?,?,?,?,?)";
        connector.query(
          sql,
          [name, email, encryptedPassword, age, dob],
          (err, results, fields) => {
            if (err) {
              res.json(err);
            } else {
              res.json({ status: 1, data: "user created" });
            }
          }
        );
      }
    }
  });
};
exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user";
  connector.query(sql, (err, results) => {
    let flag = false;
    results.forEach((user) => {
      if (user.email === email && bcrypt.compareSync(password, user.password)) {
        console.log(user.email);
        flag = true;
      }
    });
    if (flag) {
      const payload = {
        user: {
          email: email,
          password: password,
        },
      };
      jwt.sign(payload, "secret_string", { expiresIn: 1200 }, (err, token) => {
        if (err) {
          throw err;
          res.json({ status: 0, debug_data: "Temporary error in backend" });
        }
        res.json({ token, payload });
      });
    } else res.json({ status: 1, debug_data: "User doesnot logged in" });
  });
};
