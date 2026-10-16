import {createAnime, getAnimeList} from "./api.js";

document.addEventListener("DOMContentLoaded", initApp);

let animesGroupedByStatus = {};

const animeListUl = document.querySelector(".anime-list");
const statsSection = document.querySelector(".stats");
const addBtn = document.querySelector("#add-btn");
const createFormSection = document.querySelector(".create-box-container");
const createAnimeForm = document.querySelector(".create-anime-form");

createFormSection.addEventListener("click", event => {
    if (event.target === createFormSection) {
        createFormSection.classList.add("hidden");
        createAnimeForm.reset();
    }
});
addBtn.addEventListener("click", () => {
    createFormSection.classList.remove("hidden");
});
createAnimeForm.addEventListener("submit", handleCreateAnimeSubmit);

async function initApp() {
    await displayAnimes();
}

async function displayAnimes() {
    const animeList = await getAnimeList();

    animeList.forEach(anime => {
        updateAnimesGroupedByStatus(anime);
        renderAnime(anime)
    });
    renderStats();
}

function updateAnimesGroupedByStatus(anime) {
    if (!animesGroupedByStatus[anime.status]) {
        animesGroupedByStatus[anime.status] = [anime];
    } else {
        animesGroupedByStatus[anime.status].push(anime);
    }
}

function renderAnime(anime) {
    const li = document.createElement("li");
    li.setAttribute("data-id", anime.id);
    const status = formatEnum(anime.status);

    const article = document.createElement("article");
    const divHeader = document.createElement("div");
    const h3 = document.createElement("h3");
    h3.textContent = anime.title;
    divHeader.appendChild(h3);
    article.appendChild(divHeader);
    const divContainer = document.createElement("div");

    const div1 = document.createElement("div");
    const span1 = document.createElement("span");
    span1.textContent = status;
    div1.appendChild(span1);

    const div2 = document.createElement("div");
    const span2 = document.createElement("span");
    if (anime.score !== null) {
        span2.textContent = `${anime.score}/10`;
    } else {
        span2.textContent = "—"
    }
    div2.appendChild(span2);

    const div3 = document.createElement("div");
    const span3 = document.createElement("span");
    if (anime.progress !== null) {
        span3.textContent = anime.progress;
    } else {
        span3.textContent = "—"
    }
    div3.appendChild(span3);

    divContainer.appendChild(div1);
    divContainer.appendChild(div2);
    divContainer.appendChild(div3);
    article.appendChild(divContainer);
    li.appendChild(article);
    animeListUl.appendChild(li);
}

function renderStats() {
    statsSection.innerHTML = "";
    let totalAnimes = 0;
    Object.keys(animesGroupedByStatus).forEach(status => {
        const div = document.createElement("div");
        div.classList.add("stats-container");

        const spanText = document.createElement("span");
        spanText.textContent = `${formatEnum(status)}:`;

        const spanAmount = document.createElement("span");
        spanAmount.textContent = animesGroupedByStatus[status].length;
        totalAnimes += animesGroupedByStatus[status].length;

        div.appendChild(spanText);
        div.appendChild(spanAmount);
        statsSection.appendChild(div);
    });
    const div = document.createElement("div");
    div.classList.add("stats-container");

    const spanText = document.createElement("span");
    spanText.textContent = `Total amount:`

    const spanAmount = document.createElement("span");
    spanAmount.textContent = totalAnimes;

    div.appendChild(spanText);
    div.appendChild(spanAmount);
    statsSection.prepend(div);
}

async function handleCreateAnimeSubmit(event) {
    event.preventDefault();
    const animeData = new FormData(event.target);
    const title = animeData.get("title");
    const status = animeData.get("status");
    const score = animeData.get("score");
    const progress = animeData.get("progress");
    const anime = {
        title,
        status,
        score,
        progress
    }

    try {
        const savedAnime = await createAnime(anime);
        updateAnimesGroupedByStatus(savedAnime);
        renderStats();
        renderAnime(savedAnime);
        event.target.reset();
        createFormSection.classList.add("hidden");
    } catch (error) {
        console.log("Couldn't create anime: " + error.message);
    }
}

function formatEnum(status) {
    return status
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
}