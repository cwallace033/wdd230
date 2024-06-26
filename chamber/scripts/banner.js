document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById('meeting-banner');
    const button = document.getElementById('close-banner');

    const date = new Date();
    const today = date.getDay();

    if (today >= 1 && today <= 3) {
        banner.style.display = 'block';
    }

    button.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});