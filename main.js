import { displayPlanetInfo } from "./Modules/display.js"
import { searchPlanets } from "./Modules/search.js"



/* ------------------ Variables ------------------  */


const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";
const baseURL ="https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
let planetsData = {};



/* ------------------ API ------------------ */


// Gets API-key from .keys endpoint with a POST request
async function getApiKey() {
  let resp = await fetch(keyURL, {
    method: "POST",
  });

  // Check response
  if (!resp.ok) {
    console.error("Something went wrong: ", resp.status);
    return;
  }
  let data = await resp.json();
  return data.key;
}

// A function that fetches all planetdata from the bodies .endpoint
async function getPlanets() {
  try {
    // Retrieves the API key using the getApiKey function
    const apiKey = await getApiKey();
    console.log("ApiKey i getPlanets", apiKey);

    // Sends a GET request to the baseURL to fetch planetdata
    const response = await fetch(baseURL, {
      method: "GET",
      headers: { "x-zocom": apiKey },
    });

    // Check response
    if (!response.ok) {
      throw new Error("Something went wrong", response.status);
    }
    let data = await response.json();
    planetsData = data.bodies;
  } catch (error) {
    console.error(error.message);
  }
  console.log("array", planetsData);
  return planetsData;
}



/* ------------------ Creating stars on landingpage ------------------ */

// This function creates 1000 div elements representing stars and places them randomly within the body element of the page when the page loads
function createStars() {
  const pageBody = document.querySelector("body");
  for (let i = 0; i < 1000; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.width = ".2px";
    star.style.height = ".2px";
    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";
    pageBody.appendChild(star);
  }
}
createStars();



/* ------------------ Display planets ------------------ */


// An array that contains references to DOM-elements with specific id's
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


// Eventlisteners to handle searchfunctionality. If the user presses Enter-key in the search-inputfield, the searchPlanet-function is triggered
document.getElementById("search-button").addEventListener("click", searchPlanets);

document.getElementById("search-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchPlanets();
  }
});



export {getPlanets};
export {displayPlanetInfo};