import { getPlanets, displayPlanetInfo } from "/main.js";



/* --------- This module handles the search-function  --------- */


// A asynchronous function to perform planetsearch
async function searchPlanets() {
  // Gets the search term from the search input field and converts it to lowercase
  const searchTerm = document.getElementById("search-input").value.toLowerCase();

   // If searchfield is empty, exit function
   if (!searchTerm) {
    return;
  }

  // Fetch the data of all planets
  const planetsData = await getPlanets();

  // Filter the planets based on whether their names include the search term
  const filteredPlanets = planetsData.filter(planet => {
    return planet.name.toLowerCase().includes(searchTerm);
  });

  // If there are matching planets
  if (filteredPlanets.length > 0) {
    // Show information of the first matching planet
    displayPlanetInfo(filteredPlanets[0].id);
    // Clear searchfield after performing the search
    document.getElementById("search-input").value = '';
  } else {
    // If no matching planet is found, display message
    alert("Ingen planet hittades. Försök igen 🚀");
  }
} 



export {searchPlanets};