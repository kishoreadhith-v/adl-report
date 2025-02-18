document.addEventListener("DOMContentLoaded", () => {
  const contentContainer = document.getElementById("content-container");
  const loadingSpinner = document.querySelector(".loading-spinner");

  // Load initial content (home page)
  loadContent("home.html");

  // Handle navigation clicks
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = e.target.getAttribute("href");

      // Update active state
      document.querySelector(".nav-link.active")?.classList.remove("active");
      e.target.classList.add("active");

      loadContent(href);
    });
  });

  async function loadContent(url) {
    try {
      loadingSpinner.style.display = "block";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Content not found");

      const html = await response.text();

      // Extract content from the loaded HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Get only the inner content of .page-content
      const pageContent = doc.querySelector(".page-content");
      if (!pageContent) {
        throw new Error("Content structure not found");
      }

      contentContainer.innerHTML = pageContent.innerHTML;

      // Update the page title
      const newTitle = doc.querySelector("title");
      if (newTitle) {
        document.title = newTitle.textContent;
      }
    } catch (error) {
      contentContainer.innerHTML = `<div class="error">Error loading content: ${error.message}</div>`;
    } finally {
      loadingSpinner.style.display = "none";
    }
  }

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    loadContent(window.location.pathname.split("/").pop() || "home.html");
  });
});
