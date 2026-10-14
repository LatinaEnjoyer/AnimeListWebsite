package redjudas.bluejudas.animelist.anime;

public class AnimeMapper {

    public static AnimeResponse toResponse(Anime anime) {
        return new AnimeResponse(
                anime.getId(),
                anime.getTitle(),
                anime.getStatus(),
                anime.getScore(),
                anime.getProgress()
        );
    }

    public static Anime toAnime(AnimeRequest request) {
        return new Anime(
                request.title(),
                request.status(),
                request.score(),
                request.progress()
        );
    }
}
