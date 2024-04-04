// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players`)
    console.log(response)
    const json = await response.json();
    console.log(json.data.players);
    return (json.data.players);
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
    return[];
  } 
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players/${playerId}`)
    console.log(response)
    const playerId = await response.playerId();
    console.log(playerId);
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerObj),
    });
    if (!response.ok) {
      throw new Error('Failed to add player');
    }
    const newPlayer = await response.json();
    return newPlayer;
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  try {
    // TODO
    const response = await fetch(`${API_URL}/players/${playerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to remove player #${playerId}`);
    }
    console.log(`Player #${playerId} has been successfully removed.`);
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */
const renderAllPlayers = (playerList) => {
  // TODO
  const renderAllPlayers = (playerList) => {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = ''; // Clear previous content
  
    playerList.forEach((player) => {
      const playerCard = document.createElement('div');
      playerCard.classList.add('player-card');
  
      const playerName = document.createElement('h2');
      playerName.textContent = `Name: ${player.name}`;
  
      const playerId = document.createElement('p');
      playerId.textContent = `ID: ${player.id}`;
  
      const playerBreed = document.createElement('p');
      playerBreed.textContent = `Breed: ${player.breed}`;
  
      const playerImage = document.createElement('img');
      playerImage.src = player.image;
      playerImage.alt = player.name;

      const backButton = document.createElement('button');
    backButton.textContent = 'Back to all players';
    backButton.addEventListener('click', () => {
      renderAllPlayers(playerList); 

    });

    playerCard.appendChild(playerName);
    playerCard.appendChild(playerId);
    playerCard.appendChild(playerBreed);
    playerCard.appendChild(playerImage);
    playerCard.appendChild(backButton);

    mainElement.appendChild(playerCard);
  });
};
  
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  // TODO
  const renderSinglePlayer = (player) => {
    const mainElement = document.querySelector('main');
    mainElement.innerHTML = ''; // Clear main content
  
    const playerCard = document.createElement('div');
    playerCard.classList.add('player-card');
  
    const playerName = document.createElement('h2');
    playerName.textContent = player.name;
  
    const playerId = document.createElement('p');
    playerId.textContent = `ID: ${player.id}`;
  
    const playerBreed = document.createElement('p');
    playerBreed.textContent = `Breed: ${player.breed}`;
  
    const playerImage = document.createElement('img');
    playerImage.src = player.image;
    playerImage.alt = player.name;
  
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to all players';
    backButton.addEventListener('click', renderAllPlayers);
  
    playerCard.append(playerName, playerId, playerBreed, playerImage, backButton);
    mainElement.appendChild(playerCard);
  };
  renderSinglePlayer(playerData);
};


/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
    // TODO
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
