console.log('Portfolio page loaded.');

function toggleCompetency(card) {
  const allCards = document.querySelectorAll('.competency-card');

  allCards.forEach(c => {
    if (c !== card) {
      c.classList.remove('active');

      // Mobile: hide other descriptions
      const desc = c.querySelector('.competency-description');
      if (window.innerWidth <= 768 && desc) {
        desc.style.display = 'none';
      }
    }
  });

  card.classList.toggle('active');

  const desc = card.querySelector('.competency-description');
  const desktopDisplay = document.getElementById('desktop-competency-description');

  if (window.innerWidth <= 768) {
    // Mobile: toggle inline display
    if (desc) {
      desc.style.display = card.classList.contains('active') ? 'block' : 'none';
    }
    if (desktopDisplay) desktopDisplay.innerHTML = ''; // Clear desktop area
  } else {
    // Desktop: show description externally
    if (desc && card.classList.contains('active') && desktopDisplay) {
      desktopDisplay.innerHTML = `<p class="fade-in">${desc.innerHTML}</p>`;
      desktopDisplay.style.display = 'block';
    } else {
      desktopDisplay.innerHTML = '';
    }
  }
}


function increaseLike(button) {
  const countSpan = button.querySelector('.like-count');
  const key = getLikeKey(button);

  let count = parseInt(countSpan.textContent, 10);
  count++;

  countSpan.textContent = count;
  countSpan.classList.add('pop');

  localStorage.setItem(key, count);

  button.disabled = true;
  button.classList.add('liked');

  console.log("Button clicked");

  setTimeout(() => {
    countSpan.classList.remove('pop');
  }, 300);
}

function getLikeKey(button) {
  const parent = button.closest('.testimonial-entry');
  if (!parent) return 'likeCount_unknown';
  const nameElement = parent.querySelector('strong');
  const name = nameElement ? nameElement.textContent.trim() : 'unknown';
  return `likeCount_${name}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-menu a');
  const currentPage = window.location.pathname.split("/").pop() || "portfolio.html";

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage || "./" + href === currentPage) {
      link.classList.add("active-link");
    }
  });

  // Restore like counts from localStorage
  document.querySelectorAll('.like-btn').forEach(button => {
    const key = getLikeKey(button);
    const savedCount = localStorage.getItem(key);

    if (savedCount) {
      const countSpan = button.querySelector('.like-count');
      countSpan.textContent = savedCount;
      button.disabled = true;
      button.classList.add('liked');
    }
  });

  // Toggle mobile menu
  const toggleBtn = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-nav-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");

      const isOpen = mobileMenu.classList.contains("show");
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      document.documentElement.style.overflow = isOpen ? "hidden" : "auto";
    });
  }

  // ✅ Set first competency card as active by default
  const firstCard = document.querySelector('.competency-card');
  if (firstCard) {
    toggleCompetency(firstCard);
  }
});
