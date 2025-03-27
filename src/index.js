// code here

// Fetch characters and render them in the character bar
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const voteForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

fetch("http://localhost:3000/characters")
    .then(response => response.json())
    .then(data => {
        const characters = data;
        const characterBar = document.getElementById("character-bar");

        characters.forEach(character => {
            const span = document.createElement("span");
            span.textContent = character.name;
            span.style.cursor = "pointer";
            span.addEventListener("click", () => displayCharacterDetails(character));
            characterBar.appendChild(span);
        });
    })
    .catch(error => console.error("fetching error character:", error));
// Display "Mr. Cute" by default
const mrCute = characters.find((character) => character.name === "Mr. Cute");
if (mrCute) {
    displayCharacterDetails(mrCute);
}
});
function displayCharacterDetails(character) {
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");

nameElement.textContent = character.name;
imageElement.src = character.image;
imageElement.alt = character.name;
voteCountElement.textContent = character.votes;

// Handle vote submission
votesForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const voteInput = document.getElementById('votes');
    const votes =  parseInt(voteInput.value) || 0;
    selectedCharacter.votes += votes;
    voteCountElement.textContent = selectedCharacter.votes ;
    voteInput.value = '';
})
    // Update the votes in the database
    fetch(`http://localhost:3000/characters/${character.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ votes: character.votes }),
    });
}
votesInput.value = "";

// Handle vote reset
resetButton.onclick = () => {
    character.votes = 0;
    voteCountElement.textContent = character.votes;

// Reset the votes in the database
fetch(`http://localhost:3000/characters/${character.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: character.votes }),
});
};
