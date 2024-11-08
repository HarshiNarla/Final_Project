var map = L.map('map').setView([20.5937, 78.9629], 5);
        var defaultView = [20.5937, 78.9629]; // Default view coordinates
        var defaultZoom = 5; // Default zoom level

        // Load OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // All cities with famous places
        var data = [
            { name: "Delhi", lat: 28.6139, lng: 77.2090, famousPlaces: [
                { name: "India Gate", lat: 28.6129, lng: 77.2295 },
                { name: "Qutub Minar", lat: 28.5244, lng: 77.1855 },
                { name: "Red Fort", lat: 28.6562, lng: 77.2410 },
                { name: "Humayun's Tomb", lat: 28.5933, lng: 77.2507 }
            ]},
            { name: "Mumbai", lat: 19.0760, lng: 72.8777, famousPlaces: [
                { name: "Gateway of India", lat: 18.9220, lng: 72.8347 },
                { name: "Marine Drive", lat: 18.9440, lng: 72.8235 },
                { name: "Elephanta Caves", lat: 18.9910, lng: 72.9336 },
                { name: "Chhatrapati Shivaji Maharaj Terminus", lat: 18.9604, lng: 72.8 }           
            ]},
            { name: "Chennai", lat: 13.0827, lng: 80.2707, famousPlaces: [
                { name: "Marina Beach", lat: 13.0438, lng: 80.2806 },
                { name: "Kapaleeshwarar Temple", lat: 13.0334, lng: 80.2684 },
                { name: "Fort St. George", lat: 13.0830, lng: 80.2810 },
                { name: "Santhome Cathedral", lat: 13.0364, lng: 80.2816 }
            ]},
            { name: "Bangalore", lat: 12.9716, lng: 77.5946, famousPlaces: [
                { name: "Lalbagh Botanical Garden", lat: 12.9527, lng: 77.5833 },
                { name: "Bangalore Palace", lat: 12.9985, lng: 77.5923 },
                { name: "Vidhana Soudha", lat: 12.9714, lng: 77.5930 }
            ]},
            { name: "Jaipur", lat: 26.9124, lng: 75.7873, famousPlaces: [
                { name: "Amber Fort", lat: 26.9855, lng: 75.8513 },
                { name: "Hawa Mahal", lat: 26.9245, lng: 75.8234 },
                { name: "City Palace", lat: 26.9285, lng: 75.8232 }
            ]},
            { name: "Goa", lat: 15.2993, lng: 74.1240, famousPlaces: [
                { name: "Baga Beach", lat: 15.5520, lng: 73.7838 },
                { name: "Fort Aguada", lat: 15.5515, lng: 73.8029 },
                { name: "Chapora Fort", lat: 15.5525, lng: 73.7525 }
            ]},
            { name: "Kolkata", lat: 22.5726, lng: 88.3639, famousPlaces: [
                { name: "Victoria Memorial", lat: 22.5460, lng: 88.3497 },
                { name: "Howrah Bridge", lat: 22.5964, lng: 88.3639 },
                { name: "Indian Museum", lat: 22.5602, lng: 88.3517 }
            ]},
            { name: "Hyderabad", lat: 17.3850, lng: 78.4867, famousPlaces: [
                { name: "Charminar", lat: 17.3616, lng: 78.4747 },
                { name: "Golconda Fort", lat: 17.4040, lng: 77.6024 },
                { name: "Hussain Sagar Lake", lat: 17.4241, lng: 78.4560 }
            ]},
            { name: "Agra", lat: 27.1767, lng: 78.0081, famousPlaces: [
                { name: "Taj Mahal", lat: 27.1751, lng: 78.0421 },
                { name: "Agra Fort", lat: 27.1767, lng: 78.0081 },
                { name: "Mehtab Bagh", lat: 27.1869, lng: 78.0160 }
            ]}
        ];

        // Function to render city cards
        function renderCityCards(cityList) {
            var cityCardsContainer = document.getElementById("city-cards");
            cityCardsContainer.innerHTML = ""; // Clear the previous cards

            cityList.forEach(city => {
                var card = document.createElement("div");
                card.className = "city-card";
                card.innerHTML = `
                    <h3>${city.name}</h3>
                    <p>🌡 35°C</p>
                `;
                card.onclick = function() {
                    flyToCity(city.lat, city.lng, city.famousPlaces);
                };
                cityCardsContainer.appendChild(card);
            });

        // Hide the back button when showing city cards
        document.getElementById("back-button").style.display = "none";
        }

        // Function to render famous places cards
        function renderFamousPlaces(places) {
        var cityCardsContainer = document.getElementById("city-cards");
        cityCardsContainer.innerHTML = ""; // Clear the previous cards

        places.forEach(place => {
            var card = document.createElement("div");
            card.className = "city-card";
            card.innerHTML = `
                <h3>${place.name}</h3>
                <p>🌡 30°C</p>
            `;
            card.onclick = function() {
                map.flyTo([place.lat, place.lng], 15); // Zoom level 15 for famous places
            };
            cityCardsContainer.appendChild(card);
        });

            // Show the back button when showing famous places
            document.getElementById("back-button").style.display = "block";
        }

        // Function to fly to a specific city and show its famous places
        function flyToCity(lat, lng, famousPlaces) {
            map.flyTo([lat, lng], 10); // Zoom level 10 for cities
            renderFamousPlaces(famousPlaces);
        }

        // Function to reset the map and show all city cards
        function backToMap() {
            map.setView(defaultView, defaultZoom); // Reset map view
            renderCityCards(data);
        }

        // Adding markers for all cities
        data.forEach(city => {
            L.marker([city.lat, city.lng]).addTo(map).bindPopup("<b>" + city.name + "</b>").openPopup();
        });

        // Render initial city cards
        renderCityCards(data);

        // Event listener for back button
        document.getElementById("back-button").addEventListener("click", backToMap);