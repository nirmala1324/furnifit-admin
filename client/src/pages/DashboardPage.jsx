import { useEffect, useState } from "react";
import "../styles/dashboard_page.scss";
import axios from "axios";

const DashboardPage = () => {
  // VARIABLES
  const [users, setUsers] = useState([]);

  // Calling API GET data from Database
  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getUsers");
      return response.data;
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    getUsers().then((users) => {
      console.log(users);
      setUsers(users);
    }).catch((err) => console.error("Error in getUsers: ", err))
  }, [])

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
