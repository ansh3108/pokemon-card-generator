const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;
  const finalUrl = url + id;
  fetch(finalUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          generateCard(data);
      })
      .catch(error => {
          card.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      });
};

const generateCard = (data) => {
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;
  const types = data.types.map(typeInfo => typeInfo.type.name);
  
  const themeColor = typeColor[types[0]];

  card.innerHTML = `
      <img src=${imgSrc} alt=${pokeName} />
      <h2 class="poke-name">${pokeName}</h2>
      <div class="types">
          ${types.map(type => `<span class="type" style="background-color:${typeColor[type]}">${type}</span>`).join('')}
      </div>
      <div class="stats">
          <div>
              <p>Attack</p>
              <h3>${statAttack}</h3>
          </div>
          <div>
              <p>Defense</p>
              <h3>${statDefense}</h3>
          </div>
          <div>
              <p>Speed</p>
              <h3>${statSpeed}</h3>
          </div>
      </div>
  `;

  styleCard(themeColor);
};

const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
  card.querySelectorAll(".types .type").forEach(type => {
      type.style.backgroundColor = color;
  });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
