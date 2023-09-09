package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.PostTag;
import io.github.dutianze.memo.entity.Tag;
import lombok.Data;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/9/9
 */
@Data
public class PostCreateCmd {

    private String title;

    private String backgroundImage;

    private String content;

    private List<Long> tagIds;

    public Post newPost() {
        return new Post(this.title, this.backgroundImage, this.content);
    }

    public List<PostTag> newPostTags(Post post) {
        return Stream.ofNullable(this.tagIds)
                     .flatMap(Collection::stream)
                     .map(tagId -> new PostTag(post, new Tag(tagId)))
                     .collect(Collectors.toList());
    }
}
