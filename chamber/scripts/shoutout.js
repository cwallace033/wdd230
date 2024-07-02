const baseURL = "https://cwallace033.github.io/wdd230/";
const membersURL = baseURL + "data/members.json";
const businessContainer = document.querySelector('#business_container');

async function getBusinessData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && data.companies) {
                setDailyBusiness(data.companies);
            } else {
                console.error('JSON data does not contain companies property');
            }
        } else {
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

function getRandomBusiness(companies, membershipLevel) {
    const filteredCompanies = companies.filter(company => company.membership === membershipLevel);
    const randomIndex = Math.floor(Math.random() * filteredCompanies.length);
    return filteredCompanies[randomIndex];
}

function setDailyBusiness(companies) {
    const today = new Date().toDateString();
    if (localStorage.getItem('lastUpdate') !== today) {
        const goldBusiness = getRandomBusiness(companies, 'gold');
        const silverBusiness = getRandomBusiness(companies, 'silver');

        localStorage.setItem('goldBusiness', JSON.stringify(goldBusiness));
        localStorage.setItem('silverBusiness', JSON.stringify(silverBusiness));
        localStorage.setItem('lastUpdate', today);
    }

    const goldBusiness = JSON.parse(localStorage.getItem('goldBusiness'));
    const silverBusiness = JSON.parse(localStorage.getItem('silverBusiness'));

    document.querySelector('.gold').innerHTML = `
        <h4>${goldBusiness.name}</h4>
        <p>${goldBusiness.address}</p>
        <p>${goldBusiness.phone}</p>
        <a href="${goldBusiness.website}" target="_blank">Website</a>`;

    document.querySelector('.silver').innerHTML = `
        <h4>${silverBusiness.name}</h4>
        <p>${silverBusiness.address}</p>
        <p>${silverBusiness.phone}</p>
        <a href="${silverBusiness.website}" target="_blank">Website</a>`;
}

    getBusinessData(membersURL);

