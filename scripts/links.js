const baseurl = "https://cwallace033.github.io/wdd230/";

const linksurl = baseurl + "data/links.json";

const weeksContainer = document.querySelector('#weeks');

async function getLinksData(url) {
    const response = await fetch(url);
    const data = await response.json();
    displayLinks(data.weeks);
}



const displayLinks = (lessons) => {

    lessons.foreach((lesson) => {
        let lessonItem = document.createElement('section');
        let lessonTitle = document.createElement('h4');
        let linksList = document.createElement('ul');
        
        lessonTitle.textContent = `Lesson ${lesson.lesson}`;
        lessonItem.appendChild(lessonTitle);

        lesson.links.foreach((link) => {
            let listItem = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.href = baseurl + link.url;
            anchor.textContent = link.title;
            listItem.appendChild(anchor);
            linksList.appendChild(listItem);
        });

        lessonItem.appendChild(linksList);
        weeksContainer.appendChild(lessonItem);
    });
}

getLinksData(linksurl);