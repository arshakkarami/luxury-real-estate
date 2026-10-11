const projects = [
  {
    title: "Luxury Real Estate Landing Page",
    category: "landing",
    label: "Landing Page",
    duration: "5 Days",
    description:
      "A premium real estate website with a strong hero section, luxury property cards, market highlights, and a lead form.",
    tags: ["HTML", "CSS", "Responsive", "Luxury UI"],
  },
  {
    title: "Freelancer Resume Website",
    category: "portfolio",
    label: "Portfolio",
    duration: "3 Days",
    description:
      "A modern personal resume website with skills, services, projects, smooth animations, and contact form.",
    tags: ["Portfolio", "Resume", "JavaScript", "UI Design"],
  },
  {
    title: "Startup SaaS Homepage",
    category: "business",
    label: "Business",
    duration: "7 Days",
    description:
      "A clean startup homepage with product sections, feature cards, conversion buttons, and responsive layout.",
    tags: ["Startup", "Business", "Landing Page", "Performance"],
  },
  {
    title: "Restaurant Booking Website",
    category: "business",
    label: "Business",
    duration: "6 Days",
    description:
      "A stylish restaurant website with menu highlights, reservation section, location details, and mobile-first design.",
    tags: ["Restaurant", "Booking", "Local Business", "Mobile"],
  },
  {
    title: "Designer Portfolio",
    category: "portfolio",
    label: "Portfolio",
    duration: "4 Days",
    description:
      "A polished portfolio for a designer with project previews, service sections, visual branding, and smooth scrolling.",
    tags: ["Creative", "Portfolio", "Figma", "Animation"],
  },
  {
    title: "Product Launch Page",
    category: "landing",
    label: "Landing Page",
    duration: "5 Days",
    description:
      "A launch-ready page with strong typography, trust signals, benefits, and a focused call-to-action flow.",
    tags: ["Product", "Launch", "CTA", "Branding"],
  },
];

const projectGrid = document.querySelector("#projectGrid");
const filterButtons = document.querySelectorAll(".filter");
const modal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalTags = document.querySelector("#modalTags");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const themeToggle = document.querySelector(".theme-toggle");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

function renderProjects(filter = "all") {
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = filteredProjects
    .map((project) => {
      const projectIndex = projects.indexOf(project);

      return `
        <article class="project-card" tabindex="0" role="button" data-project="${projectIndex}">
          <div class="project-preview"></div>

          <div class="project-card-content">
            <span>${project.label}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>

            <div class="project-meta">
              <small>${project.duration}</small>
              <small>View Details</small>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function openModal(projectIndex) {
  const project = projects[projectIndex];

  modalCategory.textContent = project.label;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTags.innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

projectGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (!card) return;

  openModal(Number(card.dataset.project));
});

projectGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  const card = event.target.closest(".project-card");
  if (!card) return;

  openModal(Number(card.dataset.project));
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

menuToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
  });
});

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const type = formData.get("type").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !type || !message) {
    formStatus.textContent = "Please complete all fields.";
    formStatus.style.color = "#fca5a5";
    return;
  }

  formStatus.textContent = "Message ready. Connect this form to email or backend when publishing.";
  formStatus.style.color = "#86efac";

  contactForm.reset();
});

renderProjects();
