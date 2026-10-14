package redjudas.bluejudas.animelist.anime;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @GetMapping
    public ResponseEntity<List<AnimeResponse>> getAnimeList() {
        return ResponseEntity.ok(animeService.getAnimeList());
    }

    @PostMapping("/create")
    public ResponseEntity<AnimeResponse> createAnime(@RequestBody @Valid AnimeRequest request) {
        return ResponseEntity.ok(animeService.createAnime(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnimeResponse> getAnimeById(@PathVariable Long id) {
        return ResponseEntity.ok(animeService.getAnimeById(id));
    }

    @PostMapping("/{id}")
    public ResponseEntity<AnimeResponse> updateAnime(@PathVariable Long id, @RequestBody @Valid AnimeRequest request) {
        return ResponseEntity.ok(animeService.updateAnime(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnime(@PathVariable Long id) {
        animeService.deleteAnime(id);
        return ResponseEntity.noContent().build();
    }
}
