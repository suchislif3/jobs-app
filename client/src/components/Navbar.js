import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Navbar.styles";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useGlobalContext();

  return (
    <Wrapper>
      <Link to="/">JobsAppLogo</Link>
      {user && (
        <div className="toolbar">
          <span className="user">
            <FaRegUserCircle /> {user}
          </span>
          <button onClick={logout} className="logout btn primary-btn">
            <span>Logout</span>
            <FiLogOut />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
