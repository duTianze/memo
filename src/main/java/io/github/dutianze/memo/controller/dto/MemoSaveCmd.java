package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Image;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.entity.MemoTag;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

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
        String content,
        Integer rate,
        String spoiler,
        List<String> tagIds
) {

    public Memo newMemo(String channelId) {
        Document parse = Jsoup.parse(this.content);
        List<String> background = parse.select("img").stream()
                                       .map(e -> e.attr("src"))
                                       .map(Image::getId)
                                       .toList();
        String wholeText = parse.wholeText();
        String spoiler = StringUtils.substring(wholeText, 0, 140);
        if (wholeText.length() > 140) {
            spoiler += "...";
        }
        return new Memo(channelId,
                        this.id,
                        this.title,
                        background,
                        this.content,
                        spoiler,
                        rate);
    }

    public Set<MemoTag> newMemoTags(Memo memo) {
        return Stream.ofNullable(this.tagIds)
                     .flatMap(Collection::stream)
                     .map(tagId -> new MemoTag(memo.getChannelId(), memo.getId(), tagId))
                     .collect(Collectors.toSet());
    }
}
