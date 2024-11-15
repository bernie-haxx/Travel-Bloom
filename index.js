const searchButton = document.getElementById("searchBtn");
var searchList = [];

// Search Destination and keyword
function searchDestination() {
    // Retrieve values frome the input
    const searchText = document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");

    fetch("travel_recommendation_api.json")
        // Convert into json
        .then((response) => response.json())
        // Parse Data
        .then((data) => {
            // Initiate Search
            // console.log(data);
        
            if (searchText.length == 0) {
                console.log("Please Insert Text");
                return;
            }
            console.log(lookUp(data, searchText));
    
            
        })
        .catch((e) => {
            console.log("Error:", e);
        });
};

function lookUp(array, input) {
    for (let key in array) {
        var value = array[key];
        // Check if the input is a (country, beach and temple keyword)
        if (input === key.toLowerCase() || key.toLowerCase().includes(input) || singularize(key.toLowerCase()) === input) {
            // Return the values
            return [key, value];
            
        } else {
          // Return Destination per city input
          value.forEach(element => {
            // Check Input via country
            if (element.name.toLowerCase().includes(input)) {
                console.log(element);
                searchList += element;
            // Check input via city name and make sure isn't undefined
            } else if (element.cities) {
                if (element.cities.some((i) => i.name.toLowerCase().includes(input))) {
                    searchList += element.cities.find((item) => item.name.toLowerCase().includes(input));
                }
                
            }
            
          });
        };

    };

    return searchList;
};

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
searchButton.addEventListener("click", searchDestination);