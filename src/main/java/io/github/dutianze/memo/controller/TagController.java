package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Tag;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@RestController
@RequestMapping("/api/tag")
@RequiredArgsConstructor
public class TagController {

    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<Tag> addTag(@RequestParam String name) {
        try {
            Tag addedTag = tagRepository.save(Tag.of(name));
            return ResponseEntity.status(HttpStatus.CREATED).body(addedTag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public List<Tag> findAll(@SortDefault(sort = "createdAt", direction = Sort.Direction.DESC) Sort sort) {
        return tagRepository.findAll(sort);
    }

    @GetMapping("/search")
    public Page<Tag> searchTagByName(@RequestParam(required = false, defaultValue = "") String name,
                                     @ParameterObject
                                     @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                     Pageable pageable) {
        name = "%" + name + "%";
        return tagRepository.findByNameLike(name, pageable);
    }
}
