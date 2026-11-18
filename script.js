document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Reveal sections gently as they enter the screen.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Optional light/dark theme switch. Dark is the default.
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const lightMode = document.body.classList.contains("light");
  themeToggle.textContent = lightMode ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", lightMode ? "Switch to dark theme" : "Switch to light theme");
});

// Copy the email address with a friendly confirmation.
document.getElementById("copyEmail").addEventListener("click", async () => {
  const feedback = document.getElementById("copyFeedback");
  try {
    await navigator.clipboard.writeText("yeboahstephanie231@email.com");
    feedback.textContent = "Email address copied!";
  } catch {
    feedback.textContent = "Please select and copy the email address above.";
  }
});
// RHICH PERSONAL CHAT ASSISTANT
(function () {
  const style = document.createElement("style");

  style.textContent = `
    #rhich-chat-button {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: #00e676;
      color: #07110b;
      border: none;
      padding: 15px 20px;
      border-radius: 30px;
      font-weight: bold;
      cursor: pointer;
      z-index: 9999;
    }

    #rhich-chat-box {
      display: none;
      position: fixed;
      bottom: 90px;
      right: 25px;
      width: 320px;
      max-width: calc(100vw - 50px);
      height: 400px;
      background: #101b16;
      color: white;
      border: 1px solid #00e676;
      border-radius: 15px;
      z-index: 9999;
      padding: 15px;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }

    #rhich-chat-messages {
      height: 275px;
      overflow-y: auto;
      margin-bottom: 10px;
    }

    #rhich-chat-box input {
      width: 68%;
      padding: 10px;
      border-radius: 8px;
      border: none;
    }

    #rhich-chat-box form button {
      padding: 10px;
      background: #00e676;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .rhich-message {
      background: #1d3025;
      padding: 10px;
      border-radius: 10px;
      margin: 8px 0;
      font-size: 13px;
    }
  `;

  document.head.appendChild(style);

  const button = document.createElement("button");
  button.id = "rhich-chat-button";
  button.textContent = "💬 Chat with RHICH";

  const box = document.createElement("div");
  box.id = "rhich-chat-box";

  box.innerHTML = `
    <h3>🤖 RHICH Assistant</h3>
    <div id="rhich-chat-messages">
      <div class="rhich-message">
        Hello! Welcome to RHICH. I'm Stephanie's virtual assistant.
        Ask me about her skills, projects or career interests!
      </div>
    </div>
    <form id="rhich-chat-form">
      <input id="rhich-chat-input" placeholder="Ask me something..." required>
      <button type="submit">Send</button>
    </form>
  `;

  document.body.appendChild(button);
  document.body.appendChild(box);

  button.addEventListener("click", function () {
    box.style.display =
      box.style.display === "block" ? "none" : "block";
  });

  const messages = box.querySelector("#rhich-chat-messages");

  box.querySelector("#rhich-chat-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = box.querySelector("#rhich-chat-input");
    const question = input.value.trim().toLowerCase();

    if (!question) return;

    messages.innerHTML +=
      `<div class="rhich-message"><b>You:</b> ${escapeHTML(input.value)}</div>`;

    let answer = "Sorry, I don't know that yet. Try asking about Stephanie's skills, projects or interests.";

    if (question.includes("who") || question.includes("stephanie")) {
      answer = "Stephanie Yeboah is a Computer Science student at Bosomtwe Girls' STEM High School and the creator of RHICH.";
    } else if (question.includes("skill") || question.includes("program")) {
      answer = "Stephanie has skills in HTML, Python, Microsoft Word and Graphic Design.";
    } else if (question.includes("project") || question.includes("website")) {
      answer = "Stephanie created RHICH Digital Portfolio using HTML, CSS and JavaScript.";
    } else if (question.includes("career") || question.includes("interest")) {
      answer = "Stephanie is interested in Cybersecurity and Graphic Design.";
    } else if (question.includes("contact") || question.includes("email")) {
      answer = "You can contact Stephanie at yeboahstephanie231@email.com.";
    } else if (question.includes("school")) {
      answer = "Stephanie studies Computer Science at Bosomtwe Girls' STEM High School.";
    } else if (question.includes("hello") || question.includes("hi")) {
      answer = "Hello! 👋 Welcome to RHICH. How can I help you?";
    }

    messages.innerHTML +=
      `<div class="rhich-message"><b>RHICH:</b> ${escapeHTML(answer)}</div>`;

    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  });

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
