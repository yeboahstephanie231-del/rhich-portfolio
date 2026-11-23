// RHICH PORTFOLIO FUNCTIONS

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

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

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const lightMode = document.body.classList.contains("light");
  themeToggle.textContent = lightMode ? "☾" : "☼";
});

document.getElementById("copyEmail").addEventListener("click", async () => {
  const feedback = document.getElementById("copyFeedback");

  try {
    await navigator.clipboard.writeText("yeboahstephanie231@email.com");
    feedback.textContent = "Email address copied!";
  } catch {
    feedback.textContent = "Please copy the email address above.";
  }
});


// RHICH AI CHATBOT

(function () {

  const AI_URL = "https://rhich-ai.yeboahstephanie231.workers.dev/";

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
      width: 340px;
      max-width: calc(100vw - 40px);
      height: 430px;
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
      height: 300px;
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
      line-height: 1.5;
    }
  `;

  document.head.appendChild(style);

  const button = document.createElement("button");
  button.id = "rhich-chat-button";
  button.textContent = "💬 Chat with RHICH";

  const box = document.createElement("div");
  box.id = "rhich-chat-box";

  box.innerHTML = `
    <h3>🤖 RHICH AI Assistant</h3>

    <div id="rhich-chat-messages">
      <div class="rhich-message">
        Hello! 👋 Welcome to RHICH AI.
        Ask me anything about technology, programming,
        cybersecurity, graphic design or Stephanie!
      </div>
    </div>

    <form id="rhich-chat-form">
      <input
        id="rhich-chat-input"
        placeholder="Ask me something..."
        required
      >
      <button type="submit">Send</button>
    </form>
  `;

  document.body.appendChild(button);
  document.body.appendChild(box);

  button.addEventListener("click", () => {
    box.style.display =
      box.style.display === "block" ? "none" : "block";
  });

  const messages = box.querySelector("#rhich-chat-messages");
  const form = box.querySelector("#rhich-chat-form");
  const input = box.querySelector("#rhich-chat-input");

  form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const question = input.value.trim();

    if (!question) return;

    addMessage("You", question);

    input.value = "";
    input.disabled = true;

    addMessage("RHICH", "Thinking...");

    try {

      const response = await fetch(AI_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message: question
        })
      });

      const data = await response.json();

      const thinkingMessage = messages.lastElementChild;
      thinkingMessage.remove();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      addMessage("RHICH", data.answer || "I couldn't generate an answer.");

    } catch (error) {

      messages.lastElementChild.remove();

      addMessage(
        "RHICH",
        "Sorry! I'm having trouble connecting. Please try again."
      );

      console.error(error);

    } finally {

      input.disabled = false;
      input.focus();
      messages.scrollTop = messages.scrollHeight;

    }

  });

  function addMessage(sender, text) {

    const message = document.createElement("div");
    message.className = "rhich-message";

    const name = document.createElement("b");
    name.textContent = sender + ": ";

    const content = document.createElement("span");
    content.textContent = text;

    message.appendChild(name);
    message.appendChild(content);

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

})();
