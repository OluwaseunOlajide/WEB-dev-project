// Theme change
const themeToggle = document.getElementById("themeToggle");
function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  themeToggle.textContent = t === "light" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-pressed", t === "light");
}
const saved =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark");
setTheme(saved);
themeToggle.addEventListener("click", () => {
  const next =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";
  setTheme(next);
  localStorage.setItem("theme", next);
});

// Smooth scrolling for viewProjects
document.getElementById("viewProjects").addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

// Smooth scrolling for viewProjects
document.getElementById("viewProjects").addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

// Project modal interactions
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const modalDesc = document.getElementById("modalDesc");
const viewLive = document.getElementById("viewLive");
const closeModal = document.getElementById("closeModal");
document.querySelectorAll(".project").forEach((p) => {
  p.addEventListener("click", () => openProject(p));
  p.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProject(p);
    }
  });
});
function openProject(el) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  modalTitle.textContent = el.dataset.title;
  modalImg.src = el.dataset.img;
  modalDesc.textContent = el.dataset.desc;
  viewLive.href = "#"; // replace with real url
  // trap focus
  trapFocus(modal);
}
closeModal.addEventListener("click", close);
modal.addEventListener("click", (e) => {
  if (e.target === modal) close();
});
function close() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.activeElement.blur();
}

// Simple focus trap for modal (small)
function trapFocus(container) {
  const focusables = container.querySelectorAll(
    'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0],
    last = focusables[focusables.length - 1];
  first.focus();
  function key(e) {
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === "Escape") {
      close();
    }
  }
  container.addEventListener("keydown", key);
  container._remove = () => container.removeEventListener("keydown", key);
}

// IntersectionObserver reveal animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition =
          "opacity 0.9s ease, transform 0.9s ease";
        entry.target.style.opacity = 1;
        entry.target.style.transform = "none";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document
  .querySelectorAll("section, .project, .mini-card, .hero-left, .hero-card")
  .forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(18px)";
    observer.observe(el);
  });

// Parallax subtle effect on hero image
const heroCard = document.getElementById("heroCard");
heroCard.addEventListener("mousemove", (e) => {
  const r = heroCard.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  heroCard.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${
    y * -6
  }deg) scale(1.02)`;
  heroCard.querySelector("img").style.transform = `translate(${x * 18}px, ${
    y * 18
  }px) scale(1.03)`;
});
heroCard.addEventListener("mouseleave", () => {
  heroCard.style.transform = "none";
  heroCard.querySelector("img").style.transform = "none";
});

// Contact form (demo)
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent! (Demo only, no backend)");
});

// Keyboard shortcut: press / to focus search (example)
window.addEventListener("keydown", (e) => {
  if (
    e.key === "/" &&
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    e.preventDefault();
    document.getElementById("viewProjects").focus();
  }
});

// Progressive enhancement: load images lazily
document.querySelectorAll("img").forEach((img) => {
  if ("loading" in HTMLImageElement.prototype) {
    img.loading = img.hasAttribute("loading")
      ? img.getAttribute("loading")
      : "lazy";
  }
});

// Small animation on header show/hide on scroll
let lastY = window.scrollY;
const navWrap = document.querySelector("header");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (y > lastY && y > 80) navWrap.style.transform = "translateY(-60px)";
  else navWrap.style.transform = "translateY(0)";
  lastY = y;
});

// Accessibility: ensure reduced motion respected
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((n) => (n.style.transition = "none"));
}
