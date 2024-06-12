const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;

document.getElementById("year").innerHTML = `${year}`;

let modified = new Date(document.lastModified);
document.getElementById("lastModified").innerHTML = `Last Modified: ${modified}`;


