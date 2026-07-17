const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const marsButton = document.querySelector("#marsBtn");
const marsContainer = document.querySelector("#marsPhotos");

marsButton?.addEventListener("click", loadMarsPhotos);

async function loadMarsPhotos() {
  if (!API_KEY) {
    marsContainer.innerHTML = "<div class=\"error\">A NASA API key is missing. Add VITE_NASA_API_KEY to your .env file, then restart Vite.</div>";
    return;
  }
  marsButton.disabled = true;
  marsButton.textContent = "Loading photos...";
  marsContainer.innerHTML = "<p class=\"loading\">Loading Mars Rover photos&hellip;</p>";
  const endpoint = new URL("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos");
  endpoint.search = new URLSearchParams({ sol: "1000", api_key: API_KEY });
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`NASA returned ${response.status}.`);
    const { photos = [] } = await response.json();
    marsContainer.replaceChildren();
    if (!photos.length) {
      marsContainer.innerHTML = "<p class=\"empty-state\">No Mars photos were found. Please try again later.</p>";
      return;
    }
    photos.slice(0, 6).forEach((photo) => {
      const card = document.createElement("article");
      card.className = "mars-card";
      const image = document.createElement("img");
      image.src = photo.img_src.replace(/^http:/, "https:");
      image.alt = `${photo.rover.name} Rover photo taken with ${photo.camera.full_name}`;
      image.loading = "lazy";
      const title = document.createElement("h3");
      title.textContent = `${photo.rover.name} Rover`;
      const details = document.createElement("p");
      details.textContent = `${photo.camera.full_name} · Earth date: ${photo.earth_date}`;
      card.append(image, title, details);
      marsContainer.append(card);
    });
  } catch (error) {
    marsContainer.innerHTML = `<div class="error">Unable to load Mars photos. ${error.message}</div>`;
  } finally {
    marsButton.disabled = false;
    marsButton.textContent = "Load Mars photos";
  }
}
