"use strict";
//National Park Search Page
const selection = document.querySelector("#search-DDL");
const matchingParksTblBody = document.querySelector("#matching-parks-tbl-body");
let defaultOption = new Option("Please Select A Search Type");
const tableCaption = document.querySelector("#table-caption");
const searchResultsH4 = document.querySelector("#search-results-h4")

function loadOptionsInDDL() {
  matchingParksTblBody.innerHTML = "";
  const searchByRadio = document.querySelector(
    "input[name='search-by']:checked"
  );
  if (searchByRadio == null) return;
  selection.innerHTML = "";
  if (searchByRadio.value == "location") {
    locationsArray.forEach((location) => {
      let locationOptions = new Option(location);
      selection.appendChild(locationOptions);
    });
  }
  if (searchByRadio.value == "type") {
    parkTypesArray.forEach((parkType) => {
      let parkTypeOptions = new Option(parkType);
      selection.appendChild(parkTypeOptions);
    });
  } else {
    selection.appendChild(defaultOption);
  }
}

function buildParkRow(tbody, park) {
  let row = tbody.insertRow(-1);

  let cell1 = row.insertCell(0);
  if (!park.LocationName) {
    park.LocationName = "N/A";
  }
  cell1.innerText = park.LocationName;

  let cell2 = row.insertCell(1);
  if (park.Address == 0) {
    park.Address = "N/A";
  }
  cell2.innerText = park.Address;

  let cell3 = row.insertCell(2);
  if (park.City == 0) {
    park.City = "N/A";
  }
  cell3.innerText = park.City;

  let cell4 = row.insertCell(3);
  if (park.State == 0) {
    park.State = "N/A";
  }
  cell4.innerText = park.State;

  let cell5 = row.insertCell(4);
  if (park.ZipCode == 0) {
    park.ZipCode = "N/A";
  }
  cell5.innerText = park.ZipCode;

  let cell6 = row.insertCell(5);
  if (park.Phone === 0) {
    park.Phone = "N/A";
  }
  cell6.innerText = park.Phone;

  let cell7 = row.insertCell(6);
  cell7.innerHTML = "";
  if (park.Visit) {
    cell7.innerHTML = `<a href="${park.Visit}">${park.Visit}</a>`;
  }
}

//searching array for matching parks
function findMatchingParks() {
  const searchByRadio = document.querySelector(
    "input[name='search-by']:checked"
  );
  switch (searchByRadio.value) {
    case "location":
      return nationalParksArray.filter((p) => p.State == selection.value);
    case "type":
      return nationalParksArray.filter((p) =>
        p.LocationName.includes(selection.value)
      );
    default:
      return [];
  }
}

function displayMatchingParks(matchingParks) {
  matchingParksTblBody.innerHTML = "";
  for (let i = 0; i < matchingParks.length; i++) {
    buildParkRow(matchingParksTblBody, matchingParks[i]);
  }
  tableCaption.innerText = `Displaying ${matchingParks.length} of ${nationalParksArray.length} Results`;
  searchResultsH4.innerText = "Search Results"
}

function filterAndDisplay() {
  matchingParksTblBody.innerHTML = "";
  let filteredParks = findMatchingParks();
  displayMatchingParks(filteredParks);
}

//MOUNTAINS PAGE

const mountainSearch = document.querySelector("#mountain-DDL");
const resultsDiv = document.querySelector("#results-div");

//filter through array creating new options with each index
window.onload = function loadMountains() {
  for (let i = 0; i < mountainsArray.length; i++) {
    let mountainOption = document.createElement("option");
    mountainOption.value = i;
    mountainOption.textContent = mountainsArray[i].name;
    mountainSearch.appendChild(mountainOption);
  }
};
//function to convert feet to meters
function convertFeetToMeters(elevation) {
  let elevationInMeters = +elevation * 0.304;
  return elevationInMeters.toFixed(2);
}

//display mountain data and picture
function displayMountainData(mountainValue) {
  resultsDiv.innerHTML = "";
  let mountainImageElement = document.createElement("img");
  mountainImageElement.style.width = "50%";
  mountainImageElement.style.height = "50%";
  mountainImageElement.src = `images/${mountainsArray[mountainValue].img}`;
  resultsDiv.appendChild(mountainImageElement);

  let descriptionLabel = document.createElement("h3");
  descriptionLabel.innerHTML = "Description:";
  resultsDiv.appendChild(descriptionLabel);

  let description = document.createElement("p");
  description.innerHTML = `${mountainsArray[mountainValue].desc}`;
  resultsDiv.appendChild(description);

  let elevationLabel = document.createElement("h3");
  elevationLabel.innerHTML = "Elevation:";
  resultsDiv.appendChild(elevationLabel);

  let elevation = document.createElement("p");
  elevation.innerHTML = `The elevation of ${
    mountainsArray[mountainValue].name
  } is ${mountainsArray[mountainValue].elevation} ft. (${convertFeetToMeters(
    mountainsArray[mountainValue].elevation
  )} m).`;
  resultsDiv.appendChild(elevation);

  let climbingDifficultyLabel = document.createElement("h3");
  climbingDifficultyLabel.innerHTML = "Climbing Difficulty:";
  resultsDiv.appendChild(climbingDifficultyLabel);

  let climbingDifficulty = document.createElement("p");
  climbingDifficulty.innerHTML = `The climbing difficulty  of ${
    mountainsArray[mountainValue].name
  } is ${mountainsArray[mountainValue].effort.toLowerCase()}`;
  resultsDiv.appendChild(climbingDifficulty);
}
