const BASE_URL = "http://localhost:5000";

// LOGIN
function login() {
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "demo@gmail.com"
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = "dashboard.html";
      }
    })
    .catch(err => console.error(err));
}

// SESSION BOOKING
function bookSession() {
  fetch(`${BASE_URL}/session/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      therapist: "Dr. Asha",
      time: "10:00 AM"
    })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("sessionResult").innerText =
        data.message + " | Join: " + data.session.meetingLink;
    });
}

// MOOD TRACKER
function saveMood() {
  const mood = document.getElementById("mood").value;

  fetch("http://localhost:5000/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "demo@gmail.com",
      mood
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("moodResult").innerText = data.message;
  });
}


// GAME (Simple Puzzle)
function playGame() {
  const puzzles = [
    "What is 5 + 7?",
    "Find the next number: 2, 4, 6, ?",
    "Unscramble this word: RELAX"
  ];

  const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  document.getElementById("gameResult").innerText =
    "Puzzle: " + randomPuzzle;
}

// PAYMENT
function makePayment() {
  fetch(`${BASE_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: 250
    })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("paymentResult").innerText =
        data.message + " | TXN ID: " + data.transactionId;
    });
}

function loadMoodHistory() {
  const email = "demo@gmail.com"; // same email used in login

  fetch(`http://localhost:5000/moods/${email}`)
    .then(res => res.json())
    .then(moods => {
      const list = document.getElementById("moodHistory");
      list.innerHTML = "";

      if (moods.length === 0) {
        list.innerHTML = "<li>No mood history found</li>";
        return;
      }

      moods.forEach(entry => {
        const li = document.createElement("li");
        li.innerText =
          entry.mood + " — " + new Date(entry.timestamp).toLocaleString();
        list.appendChild(li);
      });
    });
}
