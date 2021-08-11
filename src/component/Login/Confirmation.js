import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function Welcome() {
  const { token } = useParams();

  axios.get(`http://localhost:5000/users/confirm/${token}`).then((response) => {
    console.log("ok?", response.data);
    return response.data;
  });

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/loginregister"}>Please Login</Link>
    </div>
  );
}

export default Welcome;
