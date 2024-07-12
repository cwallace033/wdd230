document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById('temp-banner');
    const button = document.getElementById('close-banner');

    banner.style.display = 'block';
    

    button.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});