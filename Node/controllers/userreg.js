const bcrypt = require("bcrypt");
const UserRegister = require("../models/userreg");
const jwt = require("jsonwebtoken");
const authentication = require("../middlewares/authentication");
exports.RegsiterUser = async function (req, res) {
  let { username, email, password, dob } = req.body;
  let userName = await UserRegister.findOne({ username });
  let userEmail = await UserRegister.findOne({ email });
  if (userName) {
    res.json({ status: 0, data: "username already exists" });
  } else {
    if (userEmail) {
      res.json({ status: 0, data: "Email already exists" });
    } else {
      console.log(req.body);
      let encryptedPassword;
      try {
        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(encryptedPassword);
      } catch (error) {
        console.log(error);
        console.log("error in brcypt");
      }
      const userOb = new UserRegister({
        username: req.body.username,
        email: req.body.email,
        password: encryptedPassword,
        dob: req.body.dob,
      });
      console.log(userOb);
      userOb.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res.json({ status: 0, data: "User Created Successfully" });
        }
      });
    }
  }
};
exports.getUsers = (request, response) => {
  UserRegister.find((err, users_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { users_list } });
    }
  });
};
exports.checkUsername = async (req, res) => {
  const { username } = req.params;
  let userOb = await UserRegister.findOne({ username });
  if (!userOb) {
    res.json({ status: 1, msg: "user doesnot exist" });
  } else {
    res.json({ status: 0, debug_data: "user already exists" });
  }
};
exports.checkEmail = async (req, res) => {
  const { email } = req.params;
  let userOb = await UserRegister.findOne({ email });
  if (!userOb) {
    res.json({ status: 1, debug_data: "Email  doesnot exists" });
  } else {
    res.json({ status: 0, debug_data: "Email  already exists" });
  }
};
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  let userObj = await UserRegister.findOne({ username });
  console.log(userObj);
  if (!userObj) {
    res.json({ status: 0, debug_data: "user not found" });
  } else {
    const passCorrect = await bcrypt.compareSync(password, userObj.password);
    console.log(password);
    console.log(userObj.password);
    if (!passCorrect) {
      res.json({ status: 0, debug_data: "Incorrect Password" });
    }
    const payload = {
      user: {
        username: username,
      },
    };
    jwt.sign(payload, "secret_string", { expiresIn: 1200 }, (err, token) => {
      if (err) {
        throw (
          (error,
          res.json({ status: 0, debug_data: "temporary error in backend" }))
        );
      }
      res.json({ status: 1, token, user: userObj });
      req.session["username"] = username;
      console.log(req.session.username);
    });
  }
};
exports.editUser = [
  authentication,
  (req, res) => {
    let encryptedPassword;
    try {
      let salt = bcrypt.genSaltSync(10);
      console.log(salt);
      encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(encryptedPassword);
    } catch (error) {
      console.log(error);
      console.log("error in brcypt");
    }
    const userOb = UserRegister({
      username: req.body.username,
      email: req.body.email,
      dob: req.body.dob,
      password: encryptedPassword,
    });
    UserRegister.updateOne({ username: req.params.username }, userOb, (err) => {
      if (err) {
        res.json({ status: 0, err });
      } else {
        res.json({ status: 1, data: "User Edited successfully" });
      }
    });
  },
];
