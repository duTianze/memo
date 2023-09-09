package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.controller.dto.PostCreateCmd;
import io.github.dutianze.memo.controller.dto.PostDTO;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.repository.PostRepository;
import io.github.dutianze.memo.repository.TagRepository;
import io.github.dutianze.memo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PostRepository postRepository;
    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<PostDTO> addPost(@RequestBody PostCreateCmd postCreateCmd) {
        try {
            PostDTO postDTO = postService.addPost(postCreateCmd);
            return ResponseEntity.status(HttpStatus.CREATED).body(postDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(value = "/search")
    public Page<PostDTO> findPostDTOByTagId(@RequestParam(required = false)
                                            Long tagId,
                                            @ParameterObject
                                            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                            Pageable pageable) {
        if (Objects.isNull(tagId)) {
            Page<Post> posts = postRepository.findAll(pageable);
            return posts.map(post -> new PostDTO(post, tagRepository));
        }

        Page<Post> posts = postRepository.findPostIdsByTagId(tagId, pageable);
        return posts.map(post -> new PostDTO(post, tagRepository));
    }

    @GetMapping("/{id}")
    public Post getUser(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @PutMapping("/{id}")
    public Post updateUser(@PathVariable Long id, @RequestBody Post user) {
        return postService.updatePost(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
