package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.PostTag;
import io.github.dutianze.memo.repository.PostTagRepository;
import io.github.dutianze.memo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <a href="http://localhost:8080/swagger-ui/index.html">...</a>
 *
 * @author dutianze
 * @date 2023/8/11
 */
@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostTagRepository postTagRepository;

    @PostMapping
    public ResponseEntity<Post> addNote(@RequestBody PostDTO postDTO) {
        try {
            Post addedNote = postService.addNote(postDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedNote);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/aa/{id}")
    public List<PostTag> findByPostId(@PathVariable Long id) {
        List<PostTag> allByIdPostId = postTagRepository.findAllByPostId(id);
        return allByIdPostId;
    }

    @GetMapping("/{id}")
    public Post getUser(@PathVariable Long id) {
        return postService.getNoteById(id);
    }

    @PutMapping("/{id}")
    public Post updateUser(@PathVariable Long id, @RequestBody Post user) {
        return postService.updateNote(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
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
