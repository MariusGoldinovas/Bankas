import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const UserEdit = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const isEditMode = id !== "new";

  useEffect(() => {
    if (isEditMode && state?.user) {
      setUserData({
        name: state.user.name,
        email: state.user.email,
        password: "",
      });
    }
  }, [state, isEditMode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: userData.name,
      email: userData.email,
      ...(userData.password && { password: userData.password }),
    };

    if (isEditMode) {
      axios
        .patch(`${BASE_URL}/api/user/${id}`, data)
        .then((resp) => {
          setMessage({ data: "User updated successfully", status: "success" });
          setTimeout(() => navigate("/users"), 2000);
        })
        .catch(() =>
          setMessage({ data: "Failed to update user", status: "danger" })
        );
    } else {
      axios
        .post(`${BASE_URL}/api/user/create`, data)
        .then((resp) => {
          setMessage({ data: "User created successfully", status: "success" });
          setTimeout(() => navigate("/users"), 2000);
        })
        .catch(() =>
          setMessage({ data: "Failed to create user", status: "danger" })
        );
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-4">
      <h1>{isEditMode ? "Edit User" : "Add User"}</h1>
      {message && (
        <div className={`alert alert-${message.status}`}>{message.data}</div>
      )}

      <form onSubmit={handleSubmit} className="d-flex flex-column ">
        <label>Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="form-control"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="form-control"
          required
        />

        <label>Password (optional)</label>
        <input
          type="password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="form-control"
        />

        <button type="submit" className="btn btn-org mt-3">
          {isEditMode ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
