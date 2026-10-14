package redjudas.bluejudas.animelist.anime;

public record AnimeResponse(
        Long id,
        String title,
        Status status,
        Long score,
        Long progress
) {
}
