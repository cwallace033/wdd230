document.addEventListener('DOMContentLoaded', function() {
    const modeButton = document.querySelector("#toggleSwitch");
    const body = document.querySelector("body");

    modeButton.addEventListener("change", () => {
        body.classList.toggle('dark-mode');
    });
});
