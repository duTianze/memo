package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.repository.ImageRepository;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@RestController
@RequestMapping("/api/image")
@RequiredArgsConstructor
public class ImageController {

  private final ImageRepository imageRepository;

  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile image)
      throws IOException {
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    Thumbnails.of(image.getInputStream())
        .size(500, 500)
        .outputFormat(MediaType.IMAGE_PNG.getSubtype())
        .toOutputStream(os);
    Image noteImage = new Image(os.toByteArray());
    Image saved = imageRepository.save(noteImage);
    return ResponseEntity.ok().body(
        saved.getURL("http://localhost:8080")
    );
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<InputStreamResource> handleFileUpload(@PathVariable("id") String id) {
    Optional<Image> noteImageOptional = imageRepository.findById(id);
    return noteImageOptional
        .map(Image::getImageData)
        .map(ByteArrayInputStream::new)
        .map(InputStreamResource::new)
        .map(streamResource -> ResponseEntity.ok()
            .contentType(MediaType.IMAGE_PNG)
            .body(streamResource))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

}
