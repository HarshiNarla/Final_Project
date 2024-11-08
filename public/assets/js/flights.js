const API_KEY = '7e4fc1685483105b73f95fdeae537399'; // Replace with your actual API key
        const searchForm = document.getElementById('search-form');
        const flightsList = document.getElementById('flights-list');
        const loadingDiv = document.getElementById('loading');
        const errorDiv = document.getElementById('error');
        const fromAirportSelect = document.getElementById('from-airport');
        const toAirportSelect = document.getElementById('to-airport');

        // Comprehensive list of Indian airports
        const indianAirports = [
            { code: 'DEL', name: 'Delhi' },
            { code: 'BOM', name: 'Mumbai' },
            { code: 'MAA', name: 'Chennai' },
            { code: 'CCU', name: 'Kolkata' },
            { code: 'BLR', name: 'Bangalore' },
            { code: 'HYD', name: 'Hyderabad' },
            { code: 'COK', name: 'Kochi' },
            { code: 'PNQ', name: 'Pune' },
            { code: 'GOI', name: 'Goa' },
            { code: 'AMD', name: 'Ahmedabad' },
            { code: 'JAI', name: 'Jaipur' },
            { code: 'LKO', name: 'Lucknow' },
            { code: 'IXC', name: 'Chandigarh' },
            { code: 'PAT', name: 'Patna' },
            { code: 'BBI', name: 'Bhubaneswar' },
            { code: 'STV', name: 'Surat' },
            { code: 'IXB', name: 'Bagdogra' },
            { code: 'GAU', name: 'Guwahati' },
            { code: 'IXR', name: 'Ranchi' },
            { code: 'RPR', name: 'Raipur' },
            { code: 'VNS', name: 'Varanasi' },
            { code: 'IXM', name: 'Madurai' },
            { code: 'TRV', name: 'Thiruvananthapuram' },
            { code: 'IXZ', name: 'Port Blair' },
            { code: 'IXE', name: 'Mangalore' },
            { code: 'NAG', name: 'Nagpur' },
            { code: 'VGA', name: 'Vijayawada' },
            { code: 'IXJ', name: 'Jammu' },
            { code: 'IXL', name: 'Leh' },
            { code: 'BDQ', name: 'Vadodara' }
        ];

        // Populate airport dropdowns
        indianAirports.forEach(airport => {
            const option = new Option(airport.name + ' (' + airport.code + ')', airport.code);
            fromAirportSelect.add(option.cloneNode(true));
            toAirportSelect.add(option);
        });

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fromAirport = fromAirportSelect.value;
            const toAirport = toAirportSelect.value;
            const flightDate = document.getElementById('flight-date').value;
            
            if (fromAirport === toAirport) {
                errorDiv.textContent = "Departure and arrival airports cannot be the same.";
                errorDiv.style.display = 'block';
                return;
            }
            
            searchFlights(fromAirport, toAirport, flightDate);
        });

        async function searchFlights(fromAirport, toAirport, date) {
            loadingDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            flightsList.innerHTML = '';

            try {
                const flights = await fetchFlights(fromAirport, toAirport);
                const filteredFlights = filterFlightsByDate(flights, date);
                displayFlights(filteredFlights, date, fromAirport, toAirport);
            } catch (error) {
                console.error('Error:', error);
                errorDiv.textContent = `Error: ${error.message}`;
                errorDiv.style.display = 'block';
            } finally {
                loadingDiv.style.display = 'none';
            }
        }

        async function fetchFlights(fromAirport, toAirport) {
            const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${fromAirport}&arr_iata=${toAirport}`);
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.info);
            }
            return data.data;
        }

        function filterFlightsByDate(flights, date) {
            const targetDate = new Date(date);
            return flights.filter(flight => {
                const flightDate = new Date(flight.departure.scheduled);
                return flightDate.toDateString() === targetDate.toDateString();
            });
        }

        function displayFlights(flights, date, fromAirport, toAirport) {
            if (flights.length === 0) {
                flightsList.innerHTML = `<p>No flights found from ${fromAirport} to ${toAirport} on ${date}.</p>`;
                return;
            }

            const flightsHTML = flights.map(flight => `
                <div class="flight-item">
                    <h3>${flight.airline.name} - Flight ${flight.flight.iata}</h3>
                    <p>From: ${flight.departure.airport} (${flight.departure.iata})</p>
                    <p>To: ${flight.arrival.airport} (${flight.arrival.iata})</p>
                    <p>Departure: ${new Date(flight.departure.scheduled).toLocaleString()}</p>
                    <p>Arrival: ${new Date(flight.arrival.scheduled).toLocaleString()}</p>
                    <p>Status: ${flight.flight_status}</p>
                    <button class="book-now" onclick="bookFlight('${flight.flight.iata}', '${flight.departure.iata}', '${flight.arrival.iata}', '${flight.departure.scheduled}')">Book Now</button>
                </div>
            `).join('');

            flightsList.innerHTML = `<h2>Flights from ${fromAirport} to ${toAirport} on ${date}</h2>${flightsHTML}`;
        }

        function bookFlight(flightNumber, fromAirport, toAirport, departureTime) {
            // This is a simulated booking URL. In a real application, you would use actual booking URLs.
            const bookingUrl = `https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiRuI_AwMeIAxU1DYMDHZPMF6oYABAAGgJzZg&co=1&ase=2&gclid=Cj0KCQjwrp-3BhDgARIsAEWJ6SxAKIyb4mdwDdosIZGzZCf8qGO28OQJ3pXqWcsYeedMOlK-yz7kWnsaAvYlEALw_wcB&ohost=www.google.com&cid=CAESVeD29TL3kVscT5sgKVev9eEeqD858BPeCuDh_WLM5jBHGQ290pzsIQyseg2mCSt0OV_1EM9E2_hgPKs50zETesh2tHwvi1VF2jEd3biFSlUiTHETQEw&sig=AOD64_3jHIXXqmZAH9KtiHPK1XAZsPLx1w&q&nis=4&adurl&ved=2ahUKEwix4orAwMeIAxXnumMGHQ3MFrMQ0Qx6BAgZEAE`;
            window.open(bookingUrl, '_blank');
        }