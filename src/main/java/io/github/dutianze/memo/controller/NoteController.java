package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Note;
import io.github.dutianze.memo.service.UserService;
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
@RequestMapping("/users")
@RequiredArgsConstructor
public class NoteController {

  private final UserService userService;

  @PostMapping
  public ResponseEntity<Note> addUser(@RequestBody Note user) {
    try {
      Note addedUser = userService.addUser(user);
      return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }

  @GetMapping("/{id}")
  public Note getUser(@PathVariable String id) {
    return userService.getUserById(id);
  }

  @PutMapping("/{id}")
  public Note updateUser(@PathVariable String id, @RequestBody Note user) {
    return userService.updateUser(id, user);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    boolean deleted = userService.deleteUser(id);
    if (deleted) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @GetMapping
  public List<Note> getAllUsers() {
    return userService.getAllUsers();
  }
}
