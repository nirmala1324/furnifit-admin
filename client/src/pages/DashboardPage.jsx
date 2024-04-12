import { useEffect, useState } from "react";
import "../styles/dashboard_page.scss";
import axios from "axios";

const DashboardPage = () => {
  // VARIABLES
  const [users, setUsers] = useState([]);

  // Calling API GET data from Database
  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((users) => {
        console.log(users);
        setUsers(users.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // HTML
  return (
    <div className="content-container">
      {users.map((user, index) => {
        return (
          <div key={index}>
            <h3>{user.name}</h3>
            <h3>{user.age}</h3>
          </div>
        );
      })}
      <h3>Hello</h3>
    </div>
  );
};

export default DashboardPage;
