import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function MembersPage(props) {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  let getToken = localStorage.getItem("token");
  getToken = getToken.replace('"', "");
  getToken = getToken.replace('"', "");
  useEffect(() => {
    axios
      .get(`/register`, {
        headers: {
          token: getToken,
        },
      })
      .then((res) => {
        setDetails(res.data.data.users_list);
        console.log(res.data.data.users_list);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="text-center">
      <h1>User Details</h1>
      <button className="btn btn-primary m-3" onClick={Logout}>
        Logout
      </button>
      <div className="table table-bordered table-striped">
        <table className="text-center w-70 m-auto">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Button</th>
          </tr>
          {details.map((val, index) => {
            return (
              <tr>
                <td>{val._id}</td>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>{val.dob}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      navigate(`/edituser/${val.username}`);
                    }}
                  >
                    <b> Edit</b>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
