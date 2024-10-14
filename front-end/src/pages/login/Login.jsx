import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        onLogin(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setError(
              "Invalid credentials. Please check your email and password."
            );
            break;
          case 400:
            setError("Missing email or password.");
            break;
          default:
            setError("An error occurred during login. Please try again later.");
            break;
        }
      } else {
        setError("Unable to reach server. Please check your connection.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-8">
          <h1 className="mb-5 text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-org w-100">
              Login
            </button>
          </form>
          {error && <p className="mt-3 text-danger text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
