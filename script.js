
"use strict";

// FinPath — Landing Page JavaScript

// Get the landing-page elements
const startBtn = document.getElementById("startBtn");
const demoBtn = document.getElementById("demoBtn");
const learnBtn = document.getElementById("learnBtn");

// Get Started → Login page
if (startBtn) {
  startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });
}

// Explore Demo → Login page
if (demoBtn) {
  demoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "login.html";
  });
}

// Explore FinPath → Scroll to features
if (learnBtn) {
  learnBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const features = document.getElementById("features");

    if (features) {
      features.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

// Smooth scrolling for internal navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// FinPath landing page is ready
console.log("FinPath landing page loaded successfully.");

const pages = {
  Goals: "goals.html",
  Priorities: "priorities.html",
  Investments: "investments.html",
  Savings: "savings.html"
};