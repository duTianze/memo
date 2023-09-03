package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.service.PostService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <a href="http://localhost:8080/swagger-ui/index.html">...</a>
 *
 * @author dutianze
 * @date 2023/8/11
 */
@RestController
@RequestMapping("/notes")
@RequiredArgsConstructor
public class PostController {

  private final PostService postService;

  @PostMapping
  public ResponseEntity<Post> addNote(@RequestBody Post note) {
    try {
      Post addedNote = postService.addNote(note);
      return ResponseEntity.status(HttpStatus.CREATED).body(addedNote);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  @GetMapping("/{id}")
  public Post getUser(@PathVariable String id) {
    return postService.getNoteById(id);
  }

  @PutMapping("/{id}")
  public Post updateUser(@PathVariable String id, @RequestBody Post user) {
    return postService.updateNote(id, user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    boolean deleted = postService.deleteNote(id);
    if (deleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping
  public List<Post> getAllUsers() {
    return postService.getAllNotes();
  }
}
