(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
  "ninja_5000": {
    "pass": 1509442,
    "coins": 0
  },
  "admin": {
    "pass": 1258072964,
    "coins": 0
  }
}

},{}],2:[function(require,module,exports){
// Global variables
let currentUser = null;
const userData = require("../databases/users.json");
let currentBoxIndex = 0;
let totalBoxes = 0;
let contentDictionary = {};

// DOM elements
const loginPage = document.getElementById("loginPage");
const promptPage = document.getElementById("promptPage");
const boxesPage = document.getElementById("boxesPage");
const contentPage = document.getElementById("contentPage");
const coinCount = document.getElementById("coinCount");
const loginButton = document.getElementById("loginButton");
const submitPrompt = document.getElementById("submitPrompt");
const boxesContainer = document.getElementById("boxesContainer");
const contentTitle = document.getElementById("contentTitle");
const contentBox = document.getElementById("contentBox");
const completeButton = document.getElementById("completeButton");
const homeLink = document.getElementById("homeLink");
const logoLink = document.getElementById("logoLink");
const profileLink = document.getElementById("profileLink");
const logoutLink = document.getElementById("logoutLink");
const chatContainer = document.getElementById("chatContainer");
const questionInput = document.getElementById("questionInput");
const askQuestion = document.getElementById("askQuestion");
const coinDisplay = document.getElementById("coinDisplay");
const loadingPage = document.getElementById("loadingPage");
const loadingText = document.getElementById("loadingText");
let loadingInterval;

// Event listeners
loginButton.addEventListener("click", handleLogin);
submitPrompt.addEventListener("click", handlePromptSubmission);
completeButton.addEventListener("click", handleCompletion);
homeLink.addEventListener("click", () => showPage(promptPage));
profileLink.addEventListener("click", () =>
  alert("Profile page not implemented in this demo.")
);
logoutLink.addEventListener("click", handleLogout);
askQuestion.addEventListener("click", handleQuestionSubmission);

document.querySelectorAll(".example").forEach((example) => {
  example.addEventListener("click", () => {
    document.getElementById("promptInput").value = example.textContent;
  });
});

// Check for existing session on page load
window.addEventListener("load", checkExistingSession);

// Functions
String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  // Login logic
  console.log(
    "Entered password: ",
    password,
    "\nHashed password: ",
    password.hashCode(),
    "\nStored password: ",
    userData[username].pass
  );

  const user = userData[username]
    ? userData[username].pass === password.hashCode()
      ? { username, password: userData[username].pass }
      : null
    : null;

  if (user) {
    currentUser = user.username;

    localStorage.setItem("user", btoa(encodeURIComponent(user.username)));
    showPage(promptPage);
    updateNavbar();
  } else {
    alert("Invalid username or password.");
  }
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("user");
  showPage(loginPage);
  updateNavbar();
  logoLink.removeEventListener("click", () => showPage(promptPage));
}

function checkExistingSession() {
  var user = localStorage.getItem("user");
  // decode user
  if (user != null) {
    console.log("Before decode: ", user);
    user = decodeURIComponent(atob(user));
    console.log("After decode: ", user);

    alert(`Welcome back, ${user}!`);
    currentUser = user;
    showPage(promptPage);
    updateNavbar();
    return true;
  } else {
    return false;
  }
}

function updateNavbar() {
  if (currentUser !== null) {
    logoLink.addEventListener("click", () => showPage(promptPage));
    homeLink.style.visibility = "visible";
    profileLink.style.visibility = "visible";
    logoutLink.textContent = `Logout @${currentUser}`;
    logoutLink.style.visibility = "visible";
    coinCount.textContent = userData[currentUser].coins;
    coinDisplay.style.visibility = "visible";
  } else {
    homeLink.style.visibility = "hidden";
    profileLink.style.visibility = "hidden";
    logoutLink.style.visibility = "hidden";
    coinDisplay.style.visibility = "hidden";
  }
}

function handlePromptSubmission() {
  const prompt = document.getElementById("promptInput").value;

  if (prompt) {
    showPage(loadingPage);
    startLoading();
    setInterval(changeShape, 1000);

    setTimeout(() => {
      totalBoxes = Math.floor(Math.random() * 5) + 3; // Random number of boxes between 3 and 7
      contentDictionary = {};

      for (let i = 0; i < totalBoxes; i++) {
        contentDictionary[i] = `Content for box ${
          i + 1
        }. This is a preview of the learning material.`;
      }

      setTimeout(() => {
        stopLoading();
        createBoxes();
        showPage(boxesPage);
      }, 5000);
    }, 5000);
  } else {
    alert("Please enter a prompt.");
  }
}

// Variables for loading page
const shapes = [
  { shape: "50%", color: "#ff7675" }, // Circle
  { shape: "0%", color: "#74b9ff" }, // Square
  { shape: "50% 0", color: "#00b894" }, // Oval
  { shape: "0% 50%", color: "#6c5ce7" }, // Rectangle
  { shape: "0 50% 50% 50%", color: "#e17055" }, // Trapezoid
  { shape: "50% 50% 0 50%", color: "#fdcb6e" }, // Parallelogram
  { shape: "50% 0 50% 0", color: "#fd79a8" }, // Rhombus
  { shape: "20% 20% 20% 20%", color: "#00cec9" }, // Hexagon
];
// const colors = ["#4a90e2", "#50c878", "#9370db", "#20b2aa", "#f08080"];
let currentIndex = 0;
// let currentColorIndex = 0;

function changeShape() {
  const shapeElement = document.getElementById("loadingShape");
  const currentShape = shapes[currentIndex];

  shapeElement.style.borderRadius = currentShape.shape;
  shapeElement.style.backgroundColor = currentShape.color;

  currentIndex = (currentIndex + 1) % shapes.length;
}

function startLoading() {
  let messageIndex = 0;
  const loadingMessages = [
    "Feeding the hamsters in our servers...",
    "Debugging quantum fluctuations in the knowledge base...",
    "Convincing DiAG that it's not in the Matrix...",
    "Optimizing algorithms for maximum coffee consumption...",
    "Teaching DiAG the art of procrastination...",
    "Convincing DiAG that 42 is indeed the answer...",
    "Recalibrating the flux capacitor for optimal learning...",
    "Untangling neural networks...",
    "Downloading more RAM for smoother brain functions...",
    "Polishing the crystal ball for more accurate predictions...",
    "Teaching DiAG to dream of electric sheep...",
    "Convincing DiAG to come out and play...",
  ];

  setInterval(() => {
    loadingText.textContent = loadingMessages[messageIndex];
    messageIndex = (messageIndex + 1) % loadingMessages.length;
  }, 3000);
}

function stopLoading() {
  clearInterval(loadingInterval);
  loadingPage.remove();
  showPage(boxesPage);
}

function createBoxes() {
  boxesContainer.innerHTML = "";
  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement("div");
    box.className = `box ${i > 0 ? "locked" : ""}`;
    box.textContent = contentDictionary[i];
    box.addEventListener("click", () => {
      if (i <= currentBoxIndex) {
        showContent(i);
      }
    });
    boxesContainer.appendChild(box);
  }
}

function showContent(index) {
  currentBoxIndex = index;
  contentTitle.textContent = `Box ${index + 1} Content`;
  contentBox.textContent = contentDictionary[index];
  chatContainer.innerHTML = ""; // Clear previous chat messages
  showPage(contentPage);
}

function handleCompletion() {
  userData[currentUser].coins += 10;
  coinCount.textContent = userData[currentUser].coins;

  currentBoxIndex++;
  if (currentBoxIndex < totalBoxes - 1) {
    boxesContainer.children[currentBoxIndex + 1].classList.remove("locked");
  }

  if (currentBoxIndex < totalBoxes) {
    createBoxes();
    showPage(boxesPage);
  } else {
    alert("Congratulations! You have completed all boxes.");
    showPage(promptPage);
  }
}

function handleQuestionSubmission() {
  const question = questionInput.value.trim();
  if (question) {
    addChatMessage(question, "user");
    questionInput.value = "";

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = "Lorem ispum dolor sit amet potato.";
      addChatMessage(aiResponse, "ai");
    }, 1000);
  }
}

function addChatMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.className = `chat-message ${sender}-message`;
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showPage(page) {
  if (page) {
    document
      .querySelectorAll(".page")
      .forEach((p) => p.classList.remove("active"));
    page.classList.add("active");
  }
}

},{"../databases/users.json":1}]},{},[2]);
