import { getPlanets } from "../main.js";



/* --------- This module is used to show information about a planet  --------- */


// DOM-elements
const planetText = document.getElementById("planet-text");
const planetOverlay = document.getElementById("planet-overlay");
const closeButton = document.getElementById("close"); 


// Eventlisteners for closebutton and Escape-key on planetpage
closeButton.addEventListener("click", closeOverlay);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOverlay();
  }
});

// Function to close planetOverlay and get back to landingpage
function closeOverlay() {
  planetOverlay.style.display = "none";
}


// A function that awaits the data from getPlanets, searches for a matching ID, and displays the current data for the planet using DOM. 
// The function is called through click events on each planet
async function displayPlanetInfo(planetId) {
    const planetsData = await getPlanets();
    const foundPlanet = planetsData.find((planet) => planet.id === planetId);
    
    // Errormessage if no planet is found
    if (!foundPlanet) {
      console.log("Planet not found");
      return;
    }
  
/* console.log("Planet", foundPlanet.name, "is clicked!"); --- used for debugging */
  
    // Changing style on planetOverlay to 'flex' to be able to display the overlay with planet info
    planetOverlay.style.display = "flex";
  

    // Adding data to planetText
    planetText.innerHTML = `<h1> ${foundPlanet.name} </h1> 
    <p> ${foundPlanet.desc} <p>
    <ul>
    <li><h4>Omkrets</h4>
    <p>${foundPlanet.circumference} KM </p></li> 
    <li><h4>Avstånd från solen</h4>
    <p>${foundPlanet.distance} KM</p></li>
    <li><h4>Max temperatur</h4> 
    <p>${foundPlanet.temp.day} C </p></li> 
    <li><h4>Min temperatur</h4>
    <p>${foundPlanet.temp.night} C </p></li>
    </ul>`;
  }



export { displayPlanetInfo };