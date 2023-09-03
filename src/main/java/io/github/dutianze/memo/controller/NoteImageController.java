package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.NoteImage;
import io.github.dutianze.memo.repository.NoteImageRepository;
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
@RequestMapping("/note-image")
@RequiredArgsConstructor
public class NoteImageController {

  private final NoteImageRepository noteImageRepository;


  @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public String handleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
    ByteArrayOutputStream os = new ByteArrayOutputStream();
    Thumbnails.of(file.getInputStream())
        .size(400, 400)
        .outputFormat(MediaType.IMAGE_PNG.getSubtype())
        .toOutputStream(os);
    NoteImage noteImage = new NoteImage(os.toByteArray());
    NoteImage save = noteImageRepository.save(noteImage);
    return save.getId();
  }

  @GetMapping(value = "/image/{id}")
  public ResponseEntity<InputStreamResource> handleFileUpload(@PathVariable("id") String id) {
    Optional<NoteImage> noteImageOptional = noteImageRepository.findById(id);
    return noteImageOptional
        .map(NoteImage::getImageData)
        .map(ByteArrayInputStream::new)
        .map(InputStreamResource::new)
        .map(streamResource -> ResponseEntity.ok()
            .contentType(MediaType.IMAGE_PNG)
            .body(streamResource))
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

}
