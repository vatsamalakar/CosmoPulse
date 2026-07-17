const STORAGE_KEY = "cosmopulse_favorites";

function getFavorites() {
  try {
    const items = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function saveFavorite(item) {
  const favorites = getFavorites();
  if (favorites.some((favorite) => favorite.date === item.date)) return false;
  favorites.push({ date: item.date, title: item.title, url: item.url, media_type: item.media_type });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return true;
}

export function loadFavorites() {
  const container = document.querySelector("#favoritesList");
  if (!container) return;
  const favorites = getFavorites();
  container.replaceChildren();
  if (!favorites.length) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "No favorites yet. Save an Astronomy Picture of the Day to build your collection.";
    container.append(message);
    return;
  }
  favorites.forEach((item) => {
    const card = document.createElement("article");
    card.className = "favorite-card";
    if (item.media_type === "image" && item.url) {
      const image = document.createElement("img");
      image.src = item.url;
      image.alt = item.title || "Saved NASA image";
      image.loading = "lazy";
      card.append(image);
    }
    const title = document.createElement("h3");
    title.textContent = item.title || "Untitled";
    const date = document.createElement("p");
    date.className = "date";
    date.textContent = item.date || "Unknown date";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "secondary-button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => removeFavorite(item.date));
    card.append(title, date, remove);
    container.append(card);
  });
}

function removeFavorite(date) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getFavorites().filter((item) => item.date !== date)));
  loadFavorites();
}
