package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.entity.MemoTag;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/9/9
 */
public record MemoSaveCmd(
        String id,
        String title,
        String background,
        String content,
        List<String> tagIds

) {

    public Memo newMemo(String channelId) {
        return new Memo(channelId,
                        this.id,
                        this.title,
                        Image.getId(this.background),
                        this.content);
    }

    public Set<MemoTag> newMemoTags(Memo memo) {
        return Stream.ofNullable(this.tagIds)
                     .flatMap(Collection::stream)
                     .map(tagId -> new MemoTag(memo.getChannelId(), memo.getId(), tagId))
                     .collect(Collectors.toSet());
    }
}
