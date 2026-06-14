import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAcTgJjE5T8264PMKawH85SIuROAYtdO_g",
  authDomain: "bestie-chat-90fc1.firebaseapp.com",
  projectId: "bestie-chat-90fc1",
  storageBucket: "bestie-chat-90fc1.firebasestorage.app",
  messagingSenderId: "934616480476",
  appId: "1:934616480476:web:b28b44fac9af090ea59219"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const allowedUsers = {
  "daksh": "12345",
  "friend": "54321"
};

let username = "";

document.getElementById("loginBtn").addEventListener("click", () => {

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (allowedUsers[user] === pass) {

    username = user;

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("chatPage").style.display = "flex";

  } else {

    alert("Wrong Username or Password");

  }

});

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {

  if (username === "") return;

  if (input.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
    name: username,
    text: input.value,
    time: Date.now()
  });

  input.value = "";

});

const q = query(
  collection(db, "messages"),
  orderBy("time")
);

onSnapshot(q, (snapshot) => {

  chat.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    const div = document.createElement("div");

    div.className = "message";

    if (data.name === username) {
      div.classList.add("me");
    } else {
      div.classList.add("friend");
    }

    const time = new Date(data.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    div.innerHTML = `
      <div class="name">${data.name}</div>
      <div>${data.text}</div>
      <div class="time">${time}</div>
    `;

    chat.appendChild(div);

  });

  chat.scrollTop = chat.scrollHeight;

});
