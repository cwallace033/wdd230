const baseURL = "https://cwallace033.github.io/wdd230/";

const linksURL = baseURL + "data/links.json";

const weeksContainer = document.querySelector('#weeks');

async function getLinksData(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data && data.lessons) {
                displayLinks(data.lessons);
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

const displayLinks = (lessons) => {
    
    let linksList = document.createElement('ul');

    lessons.forEach((lesson) => {
        let lessonItem = document.createElement('li');
        let lessonTitle = document.createElement('span');
        
        
        lessonTitle.textContent = `Lesson ${lesson.lesson} | `;
        lessonItem.appendChild(lessonTitle);

        lesson.links.forEach((link, index) => {
            let anchor = document.createElement('a');

            anchor.href = baseURL + link.url;
            anchor.textContent = link.title;
            lessonItem.appendChild(anchor);

            if (index < lesson.links.length - 1) {
                let separator = document.createTextNode(' | ');
                lessonItem.appendChild(separator);
            }
        });

        linksList.appendChild(lessonItem);
        
    });

    weeksContainer.appendChild(linksList);
}

getLinksData(linksURL);
