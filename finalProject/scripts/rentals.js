const rentalURL = "data/rental.json";

async function getLinksData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && ["Max Rental Pricing"]) {
                populateTable(data["Max Rental Pricing"]);
            } else {
                console.error('JSON data does not contain Max Rental Pricing Properties');
            }
        } else {
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

const tableBody = document.querySelector("#pricingTable tbody");

function createTableRow(rentalType, maxRiders, reservationHalf, reservationFull, walkInHalf, walkInFull)
{
    const row = document.createElement("tr");

    const rentalTypeCell = document.createElement("td");
    rentalTypeCell.textContent = rentalType;
    row.appendChild(rentalTypeCell);

    const maxRidersCell = document.createElement("td");
    maxRidersCell.textContent = maxRiders;
    row.appendChild(maxRidersCell);

    const reservationHalfCell = document.createElement("td");
    reservationHalfCell.textContent = reservationHalf;
    row.appendChild(reservationHalfCell);

    const reservationFullCell = document.createElement("td");
    reservationFullCell.textContent = reservationFull;
    row.appendChild(reservationFullCell);

    const walkInHalfCell = document.createElement("td");
    walkInHalfCell.textContent = walkInHalf;
    row.appendChild(walkInHalfCell);

    const walkInFullCell = document.createElement("td");
    walkInFullCell.textContent = walkInFull;
    row.appendChild(walkInFullCell);

    tableBody.appendChild(row);
}
function populateTable(data) {
    for (const rentalType in data["Max Rental Pricing"]["Reservation"]) {
        const maxPersons = data["Max Rental Pricing"]["Reservation"][rentalType]["Max Riders"];
        const reservationHalfDay = data["Max Rental Pricing"]["Reservation"][rentalType]["Half Day (3 hrs)"];
        const reservationFullDay = data["Max Rental Pricing"]["Reservation"][rentalType]["Full Day"];
        const walkInHalfDay = data["Max Rental Pricing"]["Walk-In"][rentalType]["Half Day (3 hrs)"];
        const walkInFullDay = data["Max Rental Pricing"]["Walk-In"][rentalType]["Full Day"];

        createTableRow(rentalType, maxPersons, reservationHalfDay, reservationFullDay, walkInHalfDay, walkInFullDay);
    }
}

getLinksData(rentalURL);