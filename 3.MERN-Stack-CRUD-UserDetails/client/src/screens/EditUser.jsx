import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditUsers = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();
  // first we need to get user by id and display that user's detail in edit UI, the we need to post
  useEffect(() => {
    // ENDPOINT 3: GET USER BY ID
    axios
      .get("http://localhost:5000/getUser/" + id)
      .then((result) => {
        console.log(result);
        // update result we got for getting user details by id as default values initially
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    //  SEND(updated values) TO ENDPOINT 4: EDIT USER '/editUser'
    axios
      .put("http://localhost:5000/editUser/" + id, { name, email, age })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Edit/Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              // default value
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              // default value
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              className="form-control"
              // default value
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button className="btn btn-success">Edit/Update</button>
        </form>
      </div>
    </div>
  );
};
export default EditUsers;
