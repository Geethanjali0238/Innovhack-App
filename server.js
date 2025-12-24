const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// --------------------
// IN-MEMORY STORAGE
// --------------------
const users = {};   // { email: { email, moods: [] } }

// --------------------
// TEST ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("Backend (In-Memory) is running 🚀");
});

// --------------------
// LOGIN
// --------------------
app.post("/login", (req, res) => {
  const { email } = req.body;

  if (!users[email]) {
    users[email] = {
      email,
      moods: []
    };
  }

  res.json({
    success: true,
    message: "Login successful",
    user: users[email]
  });
});

// --------------------
// SAVE MOOD
// --------------------
app.post("/mood", (req, res) => {
  const { email, mood } = req.body;

  if (!users[email]) {
    return res.status(400).json({ error: "User not found" });
  }

  users[email].moods.push({
    mood,
    timestamp: new Date()
  });

  res.json({
    success: true,
    message: "Mood saved successfully"
  });
});

// --------------------
// GET MOOD HISTORY
// --------------------
app.get("/moods/:email", (req, res) => {
  const email = req.params.email;

  if (!users[email]) {
    return res.json([]);
  }

  res.json(users[email].moods);
});

// --------------------
// PAYMENT (DEMO)
// --------------------
app.post("/payment", (req, res) => {
  const { email, amount } = req.body;

  res.json({
    success: true,
    message: "Payment successful",
    transactionId: "DEMO_TXN_12345",
    amount
  });
});

// --------------------
// START SERVER
// --------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
