/* --------- This module handles API  --------- */



// Variables

const keyURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys";
const baseURL ="https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
let planetsData = {};



// API

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
     /*  console.log("ApiKey i getPlanets", apiKey); --- used for debugging */
  
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



  export {getPlanets};