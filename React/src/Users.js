import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const getUsers = () => {
    axios
      .get("/users")
      .then((res) => {
        setUser(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsers();
  });
  const createUser = (event) => {
    event.preventDefault();
    const userObject = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      age: event.target.age.value,
      dob: event.target.dob.value,
    };
    axios
      .post("/users", userObject)
      .then((res) => {
        console.log(res.data);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const loginForm = () => {
    setLogin(true);
  };
  const loginUser = (event) => {
    event.preventDefault();
    const userObject = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post(`/users/checklogin`, userObject)
      .then((res) => {
        setLogin(false);
        setToken(res.data.token);
        navigate("/members");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      {login ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={loginUser}>
            <b>Enter Email : </b>
            <br />
            <input type='email' name='email' />
            <br />
            <b>Enter Password : </b>
            <br />
            <input type='password' name='password' />
            <br />
            <button className='btn'>Log In</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Registration</h2>
          <form onSubmit={createUser}>
            <b>Enter Name : </b>
            <br />
            <input type='text' name='name' />
            <br />
            <b>Enter Email : </b>
            <br />
            <input type='email' name='email' />
            <br />
            <b>Enter Password : </b>
            <br />
            <input type='password' name='password' />
            <br />
            <b>Enter Age : </b>
            <input type='number' name='age' />
            <br />
            <b>Date of Birth : </b>
            <br />
            <input type='date' name='dob' />
            <br />
            <button className='btn'>Register</button>
          </form>
          <button className='btn 1' onClick={loginForm}>
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};
export default Users;
