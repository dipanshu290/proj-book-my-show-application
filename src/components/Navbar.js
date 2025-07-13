import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-bookmyshowDark text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-bookmyshowRed">
          BookMyShow 🎟️
        </Link>
        <div className="flex space-x-6 font-medium text-sm">
          <Link to="/" className="hover:text-bookmyshowRed transition">
            Home
          </Link>
          <Link to="/movies" className="hover:text-bookmyshowRed transition">
            Movies
          </Link>
          <Link to="/bookings" className="hover:text-bookmyshowRed transition">
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
