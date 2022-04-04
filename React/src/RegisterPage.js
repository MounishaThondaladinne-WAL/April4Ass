import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const RegisterPage = () => {
  const [name, setname] = useState("");
  const [mail, setemail] = useState("");
  const [namemsg, setnamemsg] = useState("");
  const [nameStatus, setnameStatus] = useState(false);
  const [status, setStatus] = useState(false);
  const [emailstatus, setemailstatus] = useState(false);
  const [emailmsg, setemailmsg] = useState("");
  const [regmsg, setregmsg] = useState("");
  const registerUser = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      dob: event.target.dob.value,
    };
    axios.post("/register", userObject).then((res) => {
      console.log(res.data);
      setStatus(true);
      setregmsg(res.data);
      console.log(regmsg.data);
    });
  };
  const CheckUsername = () => {
    axios.get(`/register/checkusername/${name}`).then((res) => {
      console.log(res.data);
      setnameStatus(true);
      setnamemsg(res.data);
    });
  };
  const CheckEmail = () => {
    axios.get(`/register/checkemail/${mail}`).then((res) => {
      console.log(res.data);
      setemailstatus(true);
      setemailmsg(res.data);
    });
  };
  return (
    <div className="text-center">
      <form
        onSubmit={registerUser}
        className="w-50 m-auto p-3 mt-4 text-center border border-dark rounded"
      >
        <h1>Registration Form</h1>
        {status ? <h3>{regmsg.data}</h3> : ""}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="form-control w-75 m-auto mt-3 mb-4"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
          {/*{nameStatus ? <h3>{namemsg.msg}</h3> : ""}
          <button className="btn btn-primary" onClick={CheckUsername}>
            Check Username
          </button>*/}
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control w-75 m-auto mt-3 mb-4"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
          {/*{emailstatus ? <h3>{emailmsg.debug_data}</h3> : ""}
          <button className="btn btn-primary" onClick={CheckEmail}>
            Check Email
          </button>*/}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control w-75 m-auto mt-3 mb-4"
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Enter Date of Birth"
            className="form-control w-75 m-auto mt-3 mb-4"
            required
          />
          <button className="btn btn-primary">Register</button>
          <div className="p-2">
            Already Registered <Link to="/login">Login Here</Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
