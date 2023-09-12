package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.PostTag;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/9/9
 */
public record PostCreateCmd(
        String title,
        String backgroundUrl,
        String content,
        List<String> tagIds
) {

    public Post newPost() {
        return new Post(this.title, Image.getId(this.backgroundUrl), this.content);
    }

    public List<PostTag> newPostTags(Post post) {
        return Stream.ofNullable(this.tagIds)
                     .flatMap(Collection::stream)
                     .map(tagId -> new PostTag(post.getId(), tagId))
                     .collect(Collectors.toList());
    }
}
