const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

password2.addEventListener("focusout", checkSame);

function checkSame() {
    if (password.value !== password2.value) {
        password2.style.backgroundColor = "#fff0f3";
        password2.value = "";
    } else {
        password2.style.backgroundColor = "#fff";
    }
}