const baseUrl = "/api/v1"

export async function getAnimeList() {
    const response = await fetch(`${baseUrl}`);
    return response.json();
}