package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.controller.dto.MemoDTO;
import io.github.dutianze.memo.controller.dto.MemoSaveCmd;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.repository.MemoRepository;
import io.github.dutianze.memo.repository.TagRepository;
import io.github.dutianze.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Slf4j
@RestController
@RequestMapping("/api/{channelId}/memo")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;
    private final MemoRepository memoRepository;
    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<MemoDTO> saveMemo(@PathVariable
                                            String channelId,
                                            @RequestBody MemoSaveCmd memoSaveCmd) {
        try {
            MemoDTO memoDTO = memoService.saveMemo(channelId, memoSaveCmd);
            return ResponseEntity.status(HttpStatus.CREATED).body(memoDTO);
        } catch (Exception e) {
            log.error("addMemo error ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(value = "/search")
    public Slice<MemoDTO> searchMemoDTOByTagId(@PathVariable
                                               String channelId,
                                               @RequestParam(required = false)
                                               List<String> tagIds,
                                               @ParameterObject
                                               @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC, size = 20)
                                               Pageable pageable) {
        Slice<Memo> memos;
        if (CollectionUtils.isEmpty(tagIds)) {
            memos = memoRepository.findAllByChannelId(channelId, pageable);
        } else {
            memos = memoRepository.findMemoIdsByTagId(channelId, tagIds, tagIds.size(), pageable);
        }

        return memos.map(memo -> new MemoDTO(memo, tagRepository));
    }

    @GetMapping("/{id}")
    public MemoDTO findMemo(@PathVariable String id) {
        Memo memo = memoService.getMemoById(id);
        return new MemoDTO(memo, tagRepository);
    }

    @PutMapping("/{id}")
    public Memo updateMemo(@PathVariable String id, @RequestBody Memo user) {
        return memoService.updateMemo(id, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemo(@PathVariable String id) {
        boolean deleted = memoService.deleteMemo(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
