const searchButton = document.getElementById("searchBtn");
var searchList = [];
const resultDiv = document.getElementById("result");
const searchInputArea = document.getElementById("searchInput");

// Search Destination and keyword
function searchDestination() {
    // Retrieve values frome the input
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    resultDiv.innerHTML = "";

    fetch("travel_recommendation_api.json")
        // Convert into json
        .then((response) => response.json())

        // Parse Data
        .then((data) => {
            // Initiate Search
            // console.log(data);
            
            // Value Checker
            if (searchText.length == 0) {
                console.log("Please Insert Text");
                return;
            }

            const destination = lookUp(data, searchText);
            console.log(destination);
    
            // Value Checker
            if (destination.length !== 0) {
                displayResult(destination);
                searchList = [];
            } else {
                console.log("Enter a valid Destination");
                return;
            }
            
            
        })
        // Catch Error Raised and output in the console
        .catch((e) => {
            console.log("Error:", e);
        });
};

// This is the Look UP function for finding the destination via search input 
function lookUp(array, input) {
    for (let key in array) {
        var value = array[key];
        // Check if the input is a (country, beach and temple keyword)
        if (input === key.toLowerCase() || key.toLowerCase().includes(input) || singularize(key.toLowerCase()) === input) {
            // Return the values
            return value;
            
        } else {
          // Return Destination per city input
          value.forEach(element => {
            // Check Input via country
            if (element.name.toLowerCase().includes(input)) {
                searchList.push(element);
            // Check input via city name and make sure isn't undefined
            } else if (element.cities) {
                if (element.cities.some((i) => i.name.toLowerCase().includes(input))) {
                    searchList.push(element.cities.find((item) => item.name.toLowerCase().includes(input)));
                }
                
            }
            
          });
        };

    };

    return searchList;
};

// Display the results of the search Input.
function displayResult(destination) {
    if (destination) {
        resultDiv.innerHTML += `<div class="dest-card" style="background: #01696b;"></div>`;
        console.log(destination);
        for (dest of destination) {
            // If it's a collection of cities
            if (dest.cities) {
                dest.cities.forEach((city) => {
                    console.log(city);
                    resultDiv.classList.replace("hide", "show");
                    resultDiv.innerHTML += `<div class="dest-card">
                                                <img src ="${city.imageUrl}" alt="${city.name}"/>
                                                <h3>${city.name}</h3>
                                                <p>${city.description}</p>
                                                <button>Visit</button>
                                            </div>`;
                });
                return;
            } else {
                console.log(dest);
                resultDiv.classList.replace("hide", "show");
                resultDiv.innerHTML += `<div class="dest-card">
                                                <img src ="${dest.imageUrl}" alt="${dest.name}"/>
                                                <h3>${dest.name}</h3>
                                                <p>${dest.description}</p>
                                                <button>Visit</button>
                                            </div>`;
            }
            
        }
    };
}

// Clear Results from the site
function clearResult () {
    resultDiv.classList.replace("hide", "show");
    resultDiv.innerHTML = "";
}
// To singularize a word if it not found in the JSON Data.
function singularize(word) {
    const endings = {
        ves: 'fe',
        ies: 'y',
        i: 'us',
        zes: 'ze',
        ses: 's',
        es: 'e',
        s: ''
    };
    // Using REGEX to replace the endings of each if the known words into singular
    return word.replace(
        new RegExp(`(${Object.keys(endings).join('|')})$`), 
        r => endings[r]
    );
}

// Adding event Listener when the enter key is added
searchInputArea.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchDestination();
    }
});

// On Click Event Listeners
searchButton.addEventListener("click", searchDestination);