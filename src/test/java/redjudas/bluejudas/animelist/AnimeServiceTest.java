package redjudas.bluejudas.animelist;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import redjudas.bluejudas.animelist.anime.*;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AnimeServiceTest {

    @Mock
    private AnimeRepository animeRepository;

    @InjectMocks
    private AnimeService animeService;


    AnimeRequest request = new AnimeRequest(
            "One Piece",
            Status.COMPLETED,
            9L,
            220L
    );

    Anime savedAnime = new Anime(
            request.title(),
            request.status(),
            request.score(),
            request.progress()
    );

    @Test
    void createAnime_returnsAnimeResponse() {
        when(animeRepository.save(any(Anime.class))).thenReturn(savedAnime);

        AnimeResponse response = animeService.createAnime(request);

        assertNotNull(response);
        assertEquals("One Piece", response.title());
        assertEquals(Status.COMPLETED, response.status());
        assertEquals(9L, response.score());
        assertEquals(220L, response.progress());

        verify(animeRepository).save(any(Anime.class));
    }

    @Test
    void getAnimeById_returnsAnimeResponse() {
        Anime foundAnime = new Anime(
                "One Piece",
                Status.COMPLETED,
                9L,
                220L
        );
        foundAnime.setId(1L);

        when(animeRepository.findById(1L)).thenReturn(Optional.of(foundAnime));

        AnimeResponse response = animeService.getAnimeById(1L);

        assertNotNull(response);
        assertEquals("One Piece", response.title());
        assertEquals(Status.COMPLETED, response.status());
        assertEquals(9L, response.score());
        assertEquals(220L, response.progress());

        verify(animeRepository).findById(1L);
    }
}
