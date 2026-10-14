import {getAnimeList} from "./api.js";

document.addEventListener("DOMContentLoaded", initApp);

let animesGroupedByStatus = {};

const animeListUl = document.querySelector(".anime-list");
const statsSection = document.querySelector(".stats");

async function initApp() {
    await displayAnimes();
}

async function displayAnimes() {
    const animeList = await getAnimeList();

    animeList.forEach(anime => {
        if (!animesGroupedByStatus[anime.status]) {
            animesGroupedByStatus[anime.status] = [anime];
        } else {
            animesGroupedByStatus[anime.status].push(anime);
        }

        renderAnime(anime)
    });
    Object.keys(animesGroupedByStatus).forEach(status => {
        const div = document.createElement("div");
        div.classList.add("stats-container");

        const spanText = document.createElement("span");
        spanText.textContent = `${formatEnum(status)}:`;

        const spanAmount = document.createElement("span");
        spanAmount.textContent = animesGroupedByStatus[status].length;

        div.appendChild(spanText);
        div.appendChild(spanAmount);
        statsSection.appendChild(div);
    });
    document.querySelector("#total-amount").textContent = animeList.length;
}

function renderAnime(anime) {
    const li = document.createElement("li");
    li.setAttribute("data-id", anime.id);
    const status = formatEnum(anime.status);
    li.innerHTML = `
    <article class="anime">
         <div>
             <h3 id="anime-title">${anime.title}</h3>
         </div>
         <div id="anime-details">
            <div>
                <span>${status}</span>
            </div>
            <div>
                <span>${anime.score}/10</span>
            </div>
            <div>
                <span>${anime.progress}</span>
            </div>
         </div>         
    </article>`;

    animeListUl.appendChild(li);
}

function formatEnum(status) {
    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}