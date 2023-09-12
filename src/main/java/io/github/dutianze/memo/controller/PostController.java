package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.controller.dto.PostCreateCmd;
import io.github.dutianze.memo.controller.dto.PostDTO;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.repository.PostRepository;
import io.github.dutianze.memo.repository.TagRepository;
import io.github.dutianze.memo.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
@Slf4j
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
            log.error("addPost error ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(value = "/search")
    public Slice<PostDTO> searchPostDTOByTagId(@RequestParam(required = false)
                                               String tagId,
                                               @ParameterObject
                                               @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                               Pageable pageable) {
        if (StringUtils.isEmpty(tagId)) {
            Slice<Post> posts = postRepository.findAll(pageable);
            return posts.map(post -> new PostDTO(post, tagRepository));
        }

        Slice<Post> posts = postRepository.findPostIdsByTagId(tagId, pageable);
        return posts.map(post -> new PostDTO(post, tagRepository));
    }

    @GetMapping("/{id}")
    public Post getUser(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @PutMapping("/{id}")
    public Post updateUser(@PathVariable String id, @RequestBody Post user) {
        return postService.updatePost(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
