import { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
const Members = () => {
    const [details, setDetails] = useState([]);
    let getToken = localStorage.getItem('token');
    getToken = getToken.replace('"', '');
    getToken = getToken.replace('"', '');
    useEffect(() => {
        axios
            .get('/users', {
                headers: {
                    token: getToken,
                },
            })
            .then((res) => {
                setDetails(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <Logout />
            <br />
            <table>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Age</th>
                    <th>Date of Birth</th>
                </tr>
                {details.map((val, index) => {
                    return (
                        <tr>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.password}</td>
                            <td>{val.age}</td>
                            <td>{val.dob}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};
export default Members;
