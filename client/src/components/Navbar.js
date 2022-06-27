import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Navbar.styles";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { user, logout } = useGlobalContext();

  return (
    <Wrapper>
      <Link to="/" className="logo">
        <img src={logo} alt="jobtrapp logo" />
      </Link>
      {user && (
        <div className="toolbar">
          <span className="user with-icon">
            <FaRegUserCircle /> {user}
          </span>
          <button onClick={logout} className="logout btn primary-btn with-icon">
            <span>Logout</span>
            <FiLogOut />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
