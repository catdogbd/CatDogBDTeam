document.addEventListener('DOMContentLoaded', function() {
    // Get the search input and button
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");

    // Add an event listener to the search button
    searchButton.addEventListener("click", performSearch);

    // Function to perform full-text search
    async function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();

        // Show loading animation
        searchResults.innerHTML = '<li class="loading"><div class="spinner"></div> Searching...</li>';

        // Fetch data from the text file
        const data = await fetchData();

        // Clear previous results
        searchResults.innerHTML = '';

        // Filter data based on search term
        const filteredData = data.filter(item => item.toLowerCase().includes(searchTerm));

        // Display search results or "Not Found" message
        if (filteredData.length > 0) {
            filteredData.forEach(result => {
                const li = document.createElement("li");
                li.textContent = result;
                searchResults.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "Not Found";
            searchResults.appendChild(li);
        }
    }

    // Function to fetch data from the text file
    async function fetchData() {
        try {
            const response = await fetch('https://catdogbd.github.io/data.txt');
            const data = await response.text();
            return data.split('\n').filter(Boolean); // Split the text into an array of lines
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
});
