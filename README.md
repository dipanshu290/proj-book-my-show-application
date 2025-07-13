🎬 BookMyShow Clone
An interactive movie ticket booking app built with React and Tailwind CSS, featuring real-time movie data from TMDb, sleek UI, and local storage for booking history.

🚀 Features
🔍 Live Movie Info — Powered by TMDb API

🎟️ Dynamic Booking — Seat type, quantity, and price calculation

💳 Razorpay Integration — Simulated payments for fast testing

📖 My Bookings Page — Complete booking history with poster previews

🗑️ Delete & Clear Options — Manage tickets with ease

🧾 LocalStorage Support — Persistent storage for user bookings

🛠 Getting Started
bash
npm install
npm start
Runs the app on http://localhost:3000

🔐 Environment Setup
Create a .env file in the root directory and add:

env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_RAZORPAY_KEY=your_razorpay_test_key
📦 Tech Stack
Tool Purpose
React UI & Logic
Tailwind CSS Styling
TMDb API Movie Data
Razorpay Payment Simulation
localStorage Booking Persistence
🧱 Folder Structure
src/
├── components/
├── pages/
│ ├── Booking.js
│ ├── MyBookings.js
├── assets/
├── styles/
