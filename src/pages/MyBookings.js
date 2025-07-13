import { useEffect, useState } from "react";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("myBookings")) || [];
      if (Array.isArray(stored)) {
        const sorted = [...stored].reverse();
        setBookings(sorted);
      }
    } catch (err) {
      console.error("Error reading bookings:", err);
      setBookings([]);
    }
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleDelete = (index) => {
    if (!window.confirm("Delete this booking?")) return;
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("myBookings", JSON.stringify([...updated].reverse()));
    setBookings(updated);
    showToast("✅ Booking deleted");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <h1 className="text-2xl font-bold text-bookmyshowDark mb-6 text-center">
        My Bookings 🎟️
      </h1>

      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded shadow transition">
          {toast}
        </div>
      )}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((b, idx) => (
            <div
              key={idx}
              className="p-4 border rounded shadow-sm bg-bookmyshowLight relative flex flex-col md:flex-row md:items-center gap-4"
            >
              <img
                src={`https://image.tmdb.org/t/p/w154${b.posterPath}`}
                alt={b.movieTitle}
                className="w-32 h-auto rounded-md object-cover border"
              />

              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-semibold text-bookmyshowRed">
                  {b.movieTitle || "Unknown"}
                </h2>
                <p>
                  <strong>Name:</strong> {b.name}
                </p>
                <p>
                  <strong>Email:</strong> {b.email}
                </p>
                <p>
                  <strong>Phone:</strong> {b.phone}
                </p>
                <p>
                  <strong>Seats:</strong> {b.seatCount} × {b.seatType}
                </p>
                <p>
                  <strong>Total:</strong> ₹{b.total}
                </p>
                <p>
                  <strong>Payment ID:</strong> {b.razorpayId}
                </p>
                <p>
                  <strong>Time:</strong> {b.time}
                </p>
              </div>

              <button
                onClick={() => handleDelete(idx)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-sm"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
