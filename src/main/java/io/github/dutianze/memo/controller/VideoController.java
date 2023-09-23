package io.github.dutianze.memo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@RestController
@RequestMapping("/api/video")
@RequiredArgsConstructor
public class VideoController {

    @GetMapping
    public ResponseEntity<ResourceRegion> getVideo(@RequestHeader HttpHeaders headers, @RequestParam String filepath)
            throws Exception {
        Path path = Paths.get(filepath);
        UrlResource video = new UrlResource(path.toUri());
        ResourceRegion region = resourceRegion(video, headers);
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                             .contentType(
                                     MediaTypeFactory.getMediaType(video).orElse(MediaType.APPLICATION_OCTET_STREAM))
                             .body(region);
    }

    @GetMapping("/list")
    public List<String> getVideoList(@RequestParam String filepath) throws IOException {
        List<String> result;

        try (Stream<Path> walk = Files.walk(Paths.get(filepath))) {
            result = walk
                    .filter(p -> !Files.isDirectory(p))
                    .map(e -> "/api/video/" + URLEncoder.encode(e.toAbsolutePath().toString(), StandardCharsets.UTF_8))
                    .filter(f -> f.endsWith(".mp4"))
                    .collect(Collectors.toList());
        }
        return result;
    }

    private ResourceRegion resourceRegion(UrlResource video, HttpHeaders headers) throws Exception {
        long contentLength = video.contentLength();
        Optional<HttpRange> range = headers.getRange().stream().findFirst();
        if (range.isPresent()) {
            long start = range.get().getRangeStart(contentLength);
            long end = range.get().getRangeEnd(contentLength);
            long rangeLength = Math.min(2 * 1024 * 1024, end - start + 1);
            return new ResourceRegion(video, start, rangeLength);
        } else {
            long rangeLength = Math.min(2 * 1024 * 1024, contentLength);
            return new ResourceRegion(video, 0, rangeLength);
        }
    }
}
