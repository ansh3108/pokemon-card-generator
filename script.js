const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

const getPokeData = () => {
    // Generate a random number between 1 and 150
    let id = Math.floor(Math.random() * 150) + 1;
    // Combine the pokeapi url with pokemon id
    const finalUrl = url + id;
    // Fetch generated URL
    fetch(finalUrl)
        .then(response => response.json())
        .then(data => {
            generateCard(data);
        });
};

// Generate Card
const generateCard = (data) => {
    // Get necessary data and assign it to variables
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    card.innerHTML = `
        <img src=${imgSrc} alt=${pokeName} />
        <h2 class="poke-name">${pokeName}</h2>
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
};

// Add event listeners
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
