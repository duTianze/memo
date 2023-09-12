package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.Tag;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/9/6
 */
@Data
@NoArgsConstructor
public class PostDTO {

    private String id;

    private String title;

    private String backgroundUrl;

    private String content;

    private List<TagRecord> tagRecords;

    public PostDTO(Post post, TagRepository tagRepository) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.backgroundUrl = Image.getURL(post.getBackgroundId());
        this.content = post.getContent();
        List<Tag> tags = tagRepository.findByPostId(post.getId());
        this.tagRecords = Stream.ofNullable(tags)
                                .flatMap(Collection::stream)
                                .map(tag -> new TagRecord(tag.getId(), tag.getName()))
                                .collect(Collectors.toList());
    }
}
