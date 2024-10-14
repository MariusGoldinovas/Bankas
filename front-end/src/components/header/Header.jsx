import logo from "../../assets/logo_trans.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import "./Header.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/logout`);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="header m-4 d-flex justify-content-between align-items-center">
      <Link to="/">
        <img src={logo} style={{ height: 75 }} alt="Logo" />
      </Link>
      <div className="d-flex justify-content-center gap-5">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <ul className="navbar-nav">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link to="/users" className={isActive("/users")}>
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/account" className={isActive("/account")}>
                      Accounts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/create" className={isActive("/create")}>
                      Create Account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>

      <div className="login d-flex gap-3">
        {isLoggedIn ? (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-org">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
