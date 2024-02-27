import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //  GET FROM ENDPOINT 2: /
    axios
      .get("http://localhost:5000")
      .then((result) => setUsers(result.data))
      /*BELOW DETAILS COMES FROM DATABASE VIA SERVER TO CLIENT
      data=
      {
        age: 4234,
        email: "god@gmail.com",
        name: "god",
        __v: 0,
        _id: "65dd83e516793ef7cf96928d"
      }
      */
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (ID) => {
    // SEND DELETE TO ENDPOINT 5: /deleteUser
    axios
      .delete("/deleteUser/" + ID)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>AGE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    {/* change route path too for edit */}
                    <Link to={`/edit/${user._id}`} className="btn btn-success">
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
