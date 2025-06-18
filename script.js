console.log('Page Loaded');

// Optional modal handling (if needed elsewhere)
function closeModal() {
  document.getElementById("confirmationModal")?.classList.add("hidden");
}

// Contact form submission
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString()
  })
    .then(() => {
      form.reset();
      document.getElementById("confirmationModal")?.classList.remove("hidden");
    })
    .catch(() => alert("There was a problem submitting the form. Please try again."));
});

document.addEventListener("DOMContentLoaded", () => {
  // Highlight current page in both desktop and mobile navs
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-menu a');
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || href === "./" + currentPage) {
      link.classList.add("active-link");
    }
  });

  // Toggle mobile menu
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');

 if (toggleBtn && mobileMenu) {
  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");

    // Prevent background scrolling more robustly
    if (mobileMenu.classList.contains("show")) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  });
}

  // Hero image override for mobile
  const heroBg = document.querySelector('.hero-background');
  if (heroBg && window.innerWidth <= 768) {
    heroBg.style.backgroundImage = "url('image/bg10.png')";
  }
});
