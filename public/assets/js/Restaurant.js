async function searchRestaurants() {
    const location = document.getElementById('locationSearch').value.trim();
    if (!location) {
        alert('Please enter a city or state');
        return;
    }

    showLoading(true);

    try {
        // Use Nominatim API to get latitude and longitude
        const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            throw new Error('Location not found');
        }

        const { lat, lon } = geoData[0];

        // Fetch restaurants using Overpass API
        const overpassQuery = `[out:json];node(around:5000,${lat},${lon})[amenity=restaurant];out;`;
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`);
        const data = await response.json();

        const restaurants = data.elements.map(element => ({
            name: element.tags.name || "Unnamed Restaurant",
            lat: element.lat,
            lon: element.lon
        }));

        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error searching restaurants:', error);
        alert('An error occurred while searching for restaurants: ' + error.message);
    } finally {
        showLoading(false);
    }
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurantList');
    restaurantList.innerHTML = '';
    
    if (!restaurants || restaurants.length === 0) {
        restaurantList.innerHTML = '<p>No restaurants found in this location.</p>';
        return;
    }

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>Latitude: ${restaurant.lat}</p>
            <p>Longitude: ${restaurant.lon}</p>
            <a href="https://www.openstreetmap.org/?mlat=${restaurant.lat}&mlon=${restaurant.lon}&zoom=15" target="_blank">View on Map</a>
        `;
        restaurantList.appendChild(card);
    });
}


function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}