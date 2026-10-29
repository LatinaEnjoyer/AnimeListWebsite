package redjudas.bluejudas.animelist.anime;

import org.springframework.stereotype.Service;
import redjudas.bluejudas.animelist.anime.exception.NotFoundException;

import java.util.List;

@Service
public class AnimeService {

    private final AnimeRepository animeRepository;

    public AnimeService(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    public List<AnimeResponse> getAnimeList() {
        return animeRepository.findAll()
                .stream()
                .map(AnimeMapper::toResponse)
                .toList();
    }

    public AnimeResponse createAnime(AnimeRequest request) {
        Anime savedAnime = animeRepository.save(AnimeMapper.toAnime(request));
        return AnimeMapper.toResponse(savedAnime);
    }

    public AnimeResponse getAnimeById(Long id) {
        Anime anime = animeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Anime not found with id: " + id
                ));

        return AnimeMapper.toResponse(anime);
    }

    public AnimeResponse updateAnime(Long id, AnimeRequest request) {
        Anime anime = animeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Anime not found with id: " + id
                ));

        anime.setTitle(request.title());
        anime.setStatus(request.status());
        anime.setScore(request.score());
        anime.setProgress(request.progress());

        return AnimeMapper.toResponse(animeRepository.save(anime));
    }

    public void deleteAnime(Long id) {
        if (!animeRepository.existsById(id)) {
            throw new NotFoundException("Anime not found with id: " + id);
        }

        animeRepository.deleteById(id);
    }
}
