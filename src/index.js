// Your code here


document.addEventListener('DOMContentLoaded',() =>{
    const characterBar = document.getElementById('character-bar')
    const detailedInfo = document.getElementById("detailed-info");
    const voteCount = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");
    const nameInput = document.getElementById("new-name");
    const imageUrlInput = document.getElementById("image-url");
    
    let currentCharacter = null;

// Fetch and display character names fetch("/characters")
fetch('http://localhost:3000/characters')
.then(res => res.json())
.then(characters =>{
    characters.forEach(character=> addCharacterToBar(character))
    .then(data => console.log(data));

})
   // Display "Mr. Cute" by default
const mrCute = characters.find((character) => character.name === "Mr. Cute");
if (mrCute) {
    displayCharacterDetails(mrCute);
}
 

// Add character name to the character bar function
function addCharacterToBar(character){
    const span = document.createElement('span')
    span .textContent = character.name;
    span.classList. add('character-name')
    span.addEventListener("click", () => displayCharacterDetails(character));
    characterBar.appendChild(span);

}

// Display character details function
/* function */ displayCharacterDetails(character){
    currentCharacter = character;
    detailedInfo.querySelector('#name').textContent = characterBar.name
    const img = detailedInfo.querySelector('#image');
    img.src = character.image;
    img.alt = character.name;
    voteCount.textContent = character.votes;

   
};
votesForm.addEventListener('submit', event =>{
    event.preventDefault();
    const addedVotes = parseInt(votesInput.value) || 0;
    currentCharacter.votes += addedVotes;
    updateVotes(currentCharacter.id, currentCharacter.votes);
    voteCount.textContent = currentCharacter.votes;
    votesInput.value = "";

})
function updateVotes(id, votes) {
    fetch(`http://localhost:3000/characters/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ votes })
    })
}

  // reset votes button click
  resetButton.addEventListener("click", () => {
    if (currentCharacter) {
        currentCharacter.votes = 0;
        updateVotes(currentCharacter.id, 0);
        voteCount.textContent = 0;
      
    }

    
  });
// Handle adding a new character
characterForm.addEventListener('submit', event => {
    event.preventDefault();

    const newName = document.getElementById("name").value;
    const newImage = document.getElementById("#image").value;
    const newCharacter = { name: newName, image: newImage, votes: 0 };

    fetch("http://localhost:3000/characters", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(character => {
        // Add new character to the character bar
        addCharacterToBar(character);

        // Display newly added character details
        displayCharacterDetails(character);

        // Clear input fields
        characterForm.reset();
    })
   
});
     
   



})