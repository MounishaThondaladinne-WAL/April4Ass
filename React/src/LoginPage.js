import axios from "axios";
import { useState } from "react";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [msg, setmsg] = useState("");
  const [status, setStatus] = useState(false);
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  const LoginUser = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    axios.post("/register/login", userObject).then((res) => {
      console.log(res.data);
      setStatus(true);
      setmsg(res.data.debug_data);
      setToken(res.data.token);
      console.log(token)
      console.log(res.data.status);
      if (res.data.status) {
        navigate("/members");
      }
    });
  };
  return (
    <div className="text-center">
      <form
        onSubmit={LoginUser}
        className="w-50 m-auto p-3 mt-4 text-center border border-dark rounded"
      >
        <h1>Login</h1>
        {status ? <h3>{msg}</h3> : ""}
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="form-control w-75 m-auto mt-3 mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control w-75 m-auto mt-3 mb-4"
            required
          />
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
