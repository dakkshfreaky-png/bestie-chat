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

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {

  if (input.value.trim() === "") return;

  await addDoc(collection(db, "messages"), {
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

    const div = document.createElement("div");

    div.className = "message";

    div.textContent = doc.data().text;

    chat.appendChild(div);

  });

  chat.scrollTop = chat.scrollHeight;
});