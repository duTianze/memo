package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.controller.dto.TagRecord;
import io.github.dutianze.memo.entity.Tag;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static io.github.dutianze.memo.controller.ChannelController.TRASH;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@RestController
@RequestMapping("/api/{channelId}/tag")
@RequiredArgsConstructor
public class TagController {

    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<TagRecord> addTag(@PathVariable
                                            String channelId,
                                            @RequestParam String name) {
        try {
            if (TRASH.getId().equals(channelId)) {
                return null;
            }
            Tag addedTag = tagRepository.save(Tag.of(channelId, name));
            TagRecord tagRecord = new TagRecord(addedTag);
            return ResponseEntity.status(HttpStatus.CREATED).body(tagRecord);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public List<TagRecord> findAll(@PathVariable
                                   String channelId,
                                   @RequestParam(required = false)
                                   List<String> tagIds,
                                   @ParameterObject
                                   @SortDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                   Sort sort) {
        List<Tag> tags;
        if (CollectionUtils.isEmpty(tagIds)) {
            tags = tagRepository.findAllByChannelId(channelId, sort);
        } else {
            tags = tagRepository.findByTagIds(channelId, tagIds, tagIds.size(), sort);
        }

        return Stream.ofNullable(tags)
                     .flatMap(Collection::stream)
                     .map(TagRecord::new)
                     .collect(Collectors.toList());
    }
}
