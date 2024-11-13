const searchButton = document.getElementById("searchBtn");

// Search Destination and keyword
function searchDestination() {
    // Retrieve values frome the input
    const searchInput = document.getElementById("searchInput").value;
    const resultDiv = document.getElementById("result");

    fetch("travel_recommendation_api.json")
        // Convert into json
        .then((response) => response.json())
        // Parse Data
        .then((data) => {
            // Initiate Search
            console.log(data);
        })
        .catch((e) => {
            console.log("Error:", e);
        });
};

searchButton.addEventListener("click", searchDestination);