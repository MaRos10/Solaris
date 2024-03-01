import { displayPlanetInfo } from "./Modules/display.js"
import { searchPlanets } from "./Modules/search.js"
import { getPlanets } from "./Modules/api.js"



/* ------------------ Creating stars on landingpage ------------------ */


// This function creates 1000 div elements representing stars and places them randomly within the body element of the page when the page loads
function createStars() {
  const pageBody = document.querySelector("body");
  for (let i = 0; i < 1000; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = "1px";
    star.style.height = "1px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    pageBody.appendChild(star);
  }
}
createStars();



/* ------------------ Display planets ------------------ */


// An array that contains references to DOM-elements
const planetElements = [
  document.getElementById("planet0"),
  document.getElementById("planet1"),
  document.getElementById("planet2"),
  document.getElementById("planet3"),
  document.getElementById("planet4"),
  document.getElementById("planet5"),
  document.getElementById("planet6"),
  document.getElementById("planet7"),
  document.getElementById("planet8"),
  ];
  
// Eventlistener for each planet, triggering displayPlanetInfo with the index of the selected planet
planetElements.forEach((element, index) => {
  element.addEventListener("click", () => displayPlanetInfo(index));
});
  


/* ------------------ Search planets ------------------  */


// Eventlisteners to handle searchfunctionality. If the user presses searchbutton or Enter-key in the search-inputfield, 
// the searchPlanet-function is triggered
document.getElementById("search-button").addEventListener("click", searchPlanets);

document.getElementById("search-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchPlanets();
  }
});



export {getPlanets};
export {displayPlanetInfo};