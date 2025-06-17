console.log('Page Loaded');

function closeModal() {
  document.getElementById("confirmationModal").classList.add("hidden");
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
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
      document.getElementById("confirmationModal").classList.remove("hidden");
    })
    .catch((error) => alert("There was a problem submitting the form. Please try again."));
});
