import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">StreamList</Link> |{" "}
      <Link to="/movies">Movies</Link> |{" "}
      <Link to="/cart">Cart</Link> |{" "}
      <Link to="/about">About</Link>
    </nav>
  );
}

export default NavBar;