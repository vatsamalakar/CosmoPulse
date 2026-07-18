import "./style.css";
import { loadFavorites, saveFavorite } from "./favorites.js";
import "./mars.js";
import "./chatbot.js";

const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const app = document.querySelector("#app");
const datePicker = document.querySelector("#datePicker");
const searchBtn = document.querySelector("#searchBtn");
const favoriteBtn = document.querySelector("#favoriteBtn");
const status = document.querySelector("#status");
const pages = [...document.querySelectorAll(".page")];
const pageLinks = [...document.querySelectorAll("[data-page-link]")];
let currentData = null;

datePicker.max = new Date().toISOString().slice(0, 10);
searchBtn.addEventListener("click", () => loadAPOD(datePicker.value));
datePicker.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadAPOD(datePicker.value);
});
favoriteBtn.addEventListener("click", () => {
  if (currentData && saveFavorite(currentData)) {
    loadFavorites();
    setStatus("Saved to favorites.");
  }
});

function setStatus(message = "") {
  status.textContent = message;
}

function escapeHtml(value = "") {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function getMedia(data) {
  const url = data.url || data.hdurl;
  if (!url) return "<p class=\"error\">NASA did not provide a media URL for this item.</p>";
  if (data.media_type === "image") {
    return `<img class="space-image" src="${encodeURI(url)}" alt="${escapeHtml(data.title || "NASA Astronomy Picture of the Day")}" />`;
  }
  return `<a class="media-link" href="${encodeURI(url)}" target="_blank" rel="noreferrer">Open this NASA video in a new tab</a>`;
}

function showPage(pageId = "apod") {
  const nextPage = pages.some((page) => page.id === pageId) ? pageId : "apod";

  pages.forEach((page) => {
    const isActive = page.id === nextPage;
    page.hidden = !isActive;
    page.classList.toggle("active-page", isActive);
  });

  pageLinks.forEach((link) => {
    const isActive = link.dataset.pageLink === nextPage;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

async function loadAPOD(date = "") {
  currentData = null;
  favoriteBtn.disabled = true;
  setStatus("");
  app.innerHTML = "<p class=\"loading\">Loading NASA's Astronomy Picture of the Day&hellip;</p>";
  if (!API_KEY) {
    app.innerHTML = "<div class=\"error\">A NASA API key is missing. Add VITE_NASA_API_KEY to your .env file, then restart Vite.</div>";
    return;
  }
  const endpoint = new URL("https://api.nasa.gov/planetary/apod");
  endpoint.searchParams.set("api_key", API_KEY);
  if (date) endpoint.searchParams.set("date", date);
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`NASA returned ${response.status}. Please try another date.`);
    const data = await response.json();
    currentData = data;
    favoriteBtn.disabled = false;
    app.innerHTML = `<article class="apod-story"><p class="date">${escapeHtml(data.date || "")}</p><h3>${escapeHtml(data.title || "Untitled")}</h3>${getMedia(data)}<p class="description">${escapeHtml(data.explanation || "No description provided.")}</p>${data.copyright ? `<p class="credit">Credit: ${escapeHtml(data.copyright)}</p>` : ""}</article>`;
  } catch (error) {
    app.innerHTML = `<div class="error">Unable to load the Astronomy Picture of the Day. ${escapeHtml(error.message)}</div>`;
  }
}

window.addEventListener("hashchange", () => showPage(location.hash.slice(1)));

showPage(location.hash.slice(1));
loadFavorites();
loadAPOD();