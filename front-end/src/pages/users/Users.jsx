import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/user/`)
      .then((response) => setUsers(response.data))
      .catch(() =>
        setMessage({ data: "Failed to load users", status: "danger" })
      );
  }, []);

  const handleRemove = (id) => {
    if (users.length === 1) {
      setMessage({
        data: "Cannot delete the last user.",
        status: "warning",
      });
      return;
    }

    axios
      .delete(`${BASE_URL}/api/user/${id}`)
      .then((response) => {
        const updatedUsers = users.filter((user) => user._id !== id);
        setUsers(updatedUsers);

        if (updatedUsers.length === 0) {
          setMessage({ data: "No more users available.", status: "warning" });
        } else {
          setMessage({ data: response.data.message, status: "success" });
        }
      })
      .catch(() =>
        setMessage({ data: "Failed to delete user", status: "danger" })
      );
  };

  return (
    <div className="container mt-4 w-50">
      <div className="container d-flex justify-content-between">
        <h1>Users List</h1>
        <button onClick={() => navigate("/users/new")} className="btn">
          Add User
        </button>
      </div>
      {message && (
        <div className={`alert alert-${message.status}`}>{message.data}</div>
      )}

      {users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/users/${user._id}`, { state: { user } })
                      }
                      className="btn btn-link text-primary me-3"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      onClick={() => handleRemove(user._id)}
                      className="btn btn-link text-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default Users;
