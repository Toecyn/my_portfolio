console.log('Portfolio page loaded.');

function updateCompetency(skill) {
  const desc = document.getElementById("competency-description");

  const descriptions = {
    strategy:
      "Crafts bold, future-facing product visions grounded in real-world impact. Expert at uncovering whitespace, transforming market uncertainty into strategic opportunity, and architecting scalable roadmaps that deliver compounding value. Blends market insight with data precision to drive high-conviction, high-leverage decisions.I develop and execute high-impact product strategies that align with business goals, ensuring market fit and long-term growth.",
    innovation:
      "Leads with deep customer empathy as the foundation for breakthrough product innovation. Fuses qualitative research, behavioral analytics, and first-principles thinking to surface unmet needs and design solutions that resonate. Builds products that earn not just adoption, but advocacy.",
    execution:
      "Relentlessly focused on outcomes over outputs, with a proven record of shipping high-scale products that deliver measurable user and business value. Combines sharp prioritization with adaptive iteration to move fast without sacrificing quality, always optimizing for impact.",
    leadership:
      "Mobilizes cross-functional teams with influence, not authority, uniting product, engineering, design, and business stakeholders around shared outcomes. Trusted by executives for principled clarity and by teams for unblocking complexity with empathy, focus, and drive."
  };

  const allCards = document.querySelectorAll(".competency-card");
  allCards.forEach(card => card.classList.remove("active"));

  const selectedCard = document.querySelector(`.competency-card[onclick*="${skill}"]`);
  if (selectedCard) selectedCard.classList.add("active");

  desc.classList.remove("show");
  setTimeout(() => {
    desc.textContent = descriptions[skill];
    desc.classList.add("show");
  }, 100);
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

window.addEventListener('DOMContentLoaded', () => {
  updateCompetency('strategy');

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
});

function getLikeKey(button) {
  const parent = button.closest('.testimonial-entry');
  if (!parent) return 'likeCount_unknown';
  const nameElement = parent.querySelector('strong');
  const name = nameElement ? nameElement.textContent.trim() : 'unknown';
  return `likeCount_${name}`;
}
