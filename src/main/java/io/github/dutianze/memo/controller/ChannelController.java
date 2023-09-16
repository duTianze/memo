package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.entity.Channel;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.repository.ChannelRepository;
import io.github.dutianze.memo.repository.MemoRepository;
import io.github.dutianze.memo.repository.MemoTagRepository;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@RestController
@RequestMapping("/api/channel")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelRepository channelRepository;
    private final MemoRepository memoRepository;
    private final MemoTagRepository memoTagRepository;
    private final TagRepository tagRepository;

    @GetMapping
    public List<Channel> findAll(@ParameterObject
                                 @SortDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                 Sort sort) {
        List<Channel> channels = channelRepository.findAll(sort);
        channels.add(new Channel("empty", "空频道"));
        return channels;
    }

    @PostMapping
    public Channel add(@RequestParam String name) {
        return channelRepository.save(new Channel(name));
    }

    @PutMapping("/{id}")
    public Channel update(@PathVariable String id, @RequestParam String name) {
        channelRepository.findById(id)
                         .orElseThrow(() -> new NoteNotFoundException("Invalid channel ID: " + id));
        return channelRepository.save(new Channel(id, name));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public Boolean deleteMemo(@PathVariable String id) {
        if (StringUtils.isEmpty(id)) {
            return true;
        }

        if (channelRepository.existsById(id)) {
            channelRepository.deleteById(id);
            memoRepository.updateChannel(id, "empty");
            memoTagRepository.updateChannel(id, "empty");
            tagRepository.updateChannel(id, "empty");
            return true;
        }
        return false;
    }
}
