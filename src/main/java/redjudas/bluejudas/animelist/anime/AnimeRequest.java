package redjudas.bluejudas.animelist.anime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AnimeRequest(
        @NotBlank
        String title,
        @NotNull
        Status status,
        @Min(1)
        @Max(10)
        Long score,
        Long progress
) {
}
