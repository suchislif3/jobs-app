import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/Navbar.styles";
import { FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useGlobalContext();

  return (
    <Wrapper>
      <Link to="/">JobsApp</Link>
      {user && (
        <div>
          <FaRegUserCircle /> {user}
          <button onClick={logout}>
            Logout <FiLogOut />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
