import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TEST_MODE = true;
const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY;
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Booking() {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState({
    title: "Loading...",
    posterPath: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [seatType, setSeatType] = useState("Regular");

  const priceMap = {
    Regular: 180,
    Premium: 250,
    Recliner: 320,
  };

  const totalPrice = priceMap[seatType] * seatCount;

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
        );
        const movie = await res.json();
        setMovieDetails({
          title: movie.title || "Unknown",
          posterPath: movie.poster_path || "",
        });
      } catch {
        setMovieDetails({ title: "Unknown", posterPath: "" });
      }
    };

    getMovieDetails();
  }, [id]);

  const handlePayment = () => {
    if (!name.trim()) return alert("❌ Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return alert("❌ Invalid email.");
    if (!/^[6-9]\d{9}$/.test(phone))
      return alert("❌ Enter a valid 10-digit Indian mobile number.");

    const booking = {
      movieId: id,
      movieTitle: movieDetails.title,
      posterPath: movieDetails.posterPath,
      name,
      email,
      phone,
      seatType,
      seatCount,
      total: totalPrice,
      razorpayId: TEST_MODE ? "SIMULATED_PAYMENT" : null,
      time: new Date().toLocaleString(),
    };

    const previous = JSON.parse(localStorage.getItem("myBookings")) || [];

    if (TEST_MODE) {
      localStorage.setItem(
        "myBookings",
        JSON.stringify([...previous, booking])
      );
      window.location.href = "/confirmation";
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: totalPrice * 100,
      currency: "INR",
      name: "BookMyShow Clone",
      description: `Booking ${seatCount} ${seatType} seat(s) for ${movieDetails.title}`,
      handler: function (response) {
        const confirmed = {
          ...booking,
          razorpayId: response.razorpay_payment_id,
        };
        localStorage.setItem(
          "myBookings",
          JSON.stringify([...previous, confirmed])
        );
        window.location.href = "/confirmation";
      },
      prefill: { name, email, contact: phone },
      theme: { color: "#EF4444" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <main role="main" className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-bookmyshowDark mb-4">
        🎟️ Book Your Seats for{" "}
        <span className="text-bookmyshowRed">{movieDetails.title}</span>
      </h1>

      {movieDetails.posterPath && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movieDetails.posterPath}`}
          alt={movieDetails.title}
          className="mb-6 rounded-md shadow-md mx-auto"
        />
      )}

      <label htmlFor="seatType" className="block mb-2 text-sm font-medium">
        Seat Type
      </label>
      <select
        id="seatType"
        value={seatType}
        onChange={(e) => setSeatType(e.target.value)}
        className="w-full border rounded px-4 py-2 mb-4"
      >
        <option value="Regular">💺 Regular – ₹180</option>
        <option value="Premium">🛋️ Premium – ₹250</option>
        <option value="Recliner">🪞 Recliner – ₹320</option>
      </select>

      <label htmlFor="seatCount" className="block mb-2 text-sm font-medium">
        Number of Seats
      </label>
      <select
        id="seatCount"
        value={seatCount}
        onChange={(e) => setSeatCount(parseInt(e.target.value))}
        className="w-full border rounded px-4 py-2 mb-4"
      >
        {[...Array(10)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>

      <p className="text-bookmyshowRed font-semibold mb-6">
        Total Price: ₹{totalPrice}
      </p>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded"
      />

      <button
        onClick={handlePayment}
        className="w-full bg-bookmyshowRed text-white font-semibold px-4 py-3 rounded hover:bg-red-700 transition"
      >
        Proceed to Pay ₹{totalPrice}
      </button>
    </main>
  );
}

export default Booking;
