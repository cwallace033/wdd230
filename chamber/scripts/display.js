const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});
listbutton.addEventListener("click", () => {
	display.classList.add("list");
	display.classList.remove("grid");
});

const baseURL = "https://cwallace033.github.io/wdd230/";

const membersURL = baseURL + "data/members.json";

const businessContainer = document.querySelector('#business_container');

async function getBusinessData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && data.companies) {
                displayBusiness(data.companies);
            } else {
                console.error('JSON data does not contain lessons property');
            }
        } else {
            console.error('Network response was not ok:', response.statusText);
        }
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

const displayBusiness = (companies) => {
    companies.forEach(company => {
        const companySection = document.createElement('section');
        companySection.classList.add('company');

        const img = document.createElement('img');
        img.src = company.image;
        img.alt = company.name;
        companySection.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = company.name;
        companySection.appendChild(name);

        const address = document.createElement('p');
        address.textContent = company.address;
        companySection.appendChild(address);

        const phone = document.createElement('p');
        phone.textContent = company.phone;
        companySection.appendChild(phone);

        const website = document.createElement('a');
        website.href = company.website;
        website.textContent = company.website;
        website.target = '_blank';
        companySection.appendChild(website);

        businessContainer.appendChild(companySection);
    });
}

getBusinessData(membersURL);