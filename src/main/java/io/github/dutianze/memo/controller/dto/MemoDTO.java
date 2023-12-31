package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.entity.Memo;
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
public class MemoDTO {

    private String id;

    private String title;

    private List<String> background;

    private String content;

    private String spoiler;

    private Integer rate;

    private List<String> tagIds;

    public MemoDTO(Memo memo, TagRepository tagRepository) {
        this.id = memo.getId();
        this.title = memo.getTitle();
        this.background = memo.getBackground().stream().map(Image::getURL).collect(Collectors.toList());
        this.content = memo.getContent();
        this.spoiler = memo.getSpoiler();
        this.rate = memo.getRate();
        List<Tag> tags = tagRepository.findByMemoId(memo.getId());
        this.tagIds = Stream.ofNullable(tags)
                            .flatMap(Collection::stream)
                            .map(Tag::getId)
                            .collect(Collectors.toList());
    }

    public MemoDTO clearContent() {
        this.content = null;
        return this;
    }
}
