const askBtn = document.querySelector("#askBtn");
const questionInput = document.querySelector("#question");
const answerBox = document.querySelector("#answer");

const topics = [
  [["mars", "red planet", "curiosity", "perseverance"], "Mars is the fourth planet from the Sun. Its red color comes from iron oxide, or rust, in its soil."],
  [["moon", "lunar"], "Earth's Moon is about 384,400 km away and is the only world beyond Earth visited by humans."],
  [["black hole", "blackhole", "singularity"], "A black hole has gravity so strong that not even light can escape once it passes the event horizon."],
  [["galaxy", "galaxies", "milky way"], "A galaxy is a vast collection of stars, gas, dust, and dark matter held together by gravity. Our Solar System is in the Milky Way."],
  [["nasa"], "NASA is the United States space agency. It uses spacecraft, telescopes, robots, and astronauts to explore space."],
  [["sun", "solar"], "The Sun is the star at the center of our Solar System and contains roughly 99.8% of its total mass."],
  [["earth"], "Earth is the third planet from the Sun and the only known planet with life. About 71% of its surface is covered by water."],
  [["saturn", "rings"], "Saturn is a gas giant best known for its bright rings, which are made mostly of ice and rock particles."],
  [["jupiter", "gas giant"], "Jupiter is the largest planet in our Solar System. Its Great Red Spot is a giant storm that has lasted for centuries."],
  [["star", "stars"], "Stars are enormous spheres of hot gas that make energy through nuclear fusion in their cores."],
  [["astronaut", "astronauts"], "Astronauts are trained professionals who conduct research and operate spacecraft in space."],
  [["apollo"], "NASA's Apollo program landed humans on the Moon between 1969 and 1972."],
  [["iss", "space station", "international space station"], "The International Space Station is an orbiting laboratory where international crews conduct research."],
];

askBtn?.addEventListener("click", answerQuestion);
questionInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") answerQuestion();
});

function answerQuestion() {
  const question = questionInput.value.trim().toLowerCase();
  const answer = document.createElement("div");
  answer.className = "chat-answer";
  if (!question) {
    answer.textContent = "Please ask a question about space.";
  } else {
    const match = topics.find(([keywords]) => keywords.some((keyword) => question.includes(keyword)));
    answer.textContent = match ? match[1] : "I don't have an answer for that yet. Try asking about Mars, the Moon, galaxies, NASA, Saturn, or black holes.";
  }
  answerBox.replaceChildren(answer);
  questionInput.value = "";
  questionInput.focus();
}
