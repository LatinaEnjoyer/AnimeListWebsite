const baseUrl = "/api/v1"

export async function getAnimeList() {
    const response = await fetch(`${baseUrl}`);
    return response.json();
}

export async function createAnime(anime) {
    const response = await fetch(`${baseUrl}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anime)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}