
function setLastVisit() {
    const now = new Date();
    localStorage.setItem('lastVisit', now.toISOString());
}

function getLastVisit() {
    return localStorage.getItem('lastVisit');
}

function displayVisitMessage() {
    const visitMessage = document.querySelector(".visits");
    const lastVisit = getLastVisit();


    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions."
    } else {
        const lastVisitDate = new Date(lastVisit);
        const now = new Date();
        const timeDifference = now - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessage.textContent = "You last visited 1 day ago."
        } else {
            visitMessage.textContent = "You last visited " + daysDifference + " days ago."
        }
    }
    setLastVisit();
}

displayVisitMessage();
