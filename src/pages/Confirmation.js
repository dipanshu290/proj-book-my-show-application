import { useEffect, useState } from "react";

function Confirmation() {
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myBookings") || "[]");
    if (Array.isArray(stored) && stored.length > 0) {
      setLatestBooking(stored[stored.length - 1]);
    }
  }, []);

  if (!latestBooking) {
    return (
      <main role="main" className="max-w-xl mx-auto p-6 text-center">
        <h2
          className="text-2xl font-bold text-bookmyshowRed mb-4"
          aria-live="assertive"
        >
          ❌ No Booking Found
        </h2>
        <p className="text-bookmyshowDark">
          Please complete a payment to view your confirmation.
        </p>
      </main>
    );
  }

  const {
    movieId,
    movieTitle,
    name,
    email,
    phone,
    seatType,
    seatCount,
    total,
    razorpayId,
    time,
  } = latestBooking;

  return (
    <main
      role="main"
      className="max-w-xl mx-auto p-6 border rounded shadow ticket"
    >
      <section aria-label="Booking confirmation section">
        <h1
          className="text-2xl font-bold text-bookmyshowRed mb-4 text-center print:text-black"
          aria-live="polite"
        >
          ✅ Booking Confirmed
        </h1>

        <div className="grid gap-2 text-sm">
          <p>
            <strong>🎬 Movie:</strong> {movieTitle}
          </p>
          <p>
            <strong>Movie ID:</strong> {movieId}
          </p>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Seats:</strong> {seatCount} × {seatType}
          </p>
          <p>
            <strong>Payment ID:</strong> {razorpayId}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p className="font-bold text-bookmyshowRed print:text-black">
            🎟️ Total Paid: ₹{total}
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6 no-print">
          <a
            href="/bookings"
            className="px-4 py-2 bg-bookmyshowLight text-bookmyshowDark font-medium border rounded hover:bg-bookmyshowRed hover:text-white transition"
          >
            📄 View My Bookings
          </a>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-bookmyshowRed text-white font-medium rounded hover:bg-red-700 transition"
          >
            🖨️ Print Ticket
          </button>
        </div>
      </section>
    </main>
  );
}

export default Confirmation;
