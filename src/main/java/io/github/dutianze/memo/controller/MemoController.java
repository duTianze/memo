package io.github.dutianze.memo.controller;

import io.github.dutianze.memo.controller.dto.MemoSaveCmd;
import io.github.dutianze.memo.controller.dto.MemoDTO;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.repository.MemoRepository;
import io.github.dutianze.memo.repository.TagRepository;
import io.github.dutianze.memo.service.MemoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Slf4j
@RestController
@RequestMapping("/api/memo")
@RequiredArgsConstructor
public class MemoController {

    private final MemoService memoService;
    private final MemoRepository memoRepository;
    private final TagRepository tagRepository;

    @PostMapping
    public ResponseEntity<MemoDTO> saveMemo(@RequestBody MemoSaveCmd memoSaceCmd) {
        try {
            MemoDTO memoDTO = memoService.saveMemo(memoSaceCmd);
            return ResponseEntity.status(HttpStatus.CREATED).body(memoDTO);
        } catch (Exception e) {
            log.error("addMemo error ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping(value = "/search")
    public Slice<MemoDTO> searchMemoDTOByTagId(@RequestParam(required = false)
                                               String tagId,
                                               @ParameterObject
                                               @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC)
                                               Pageable pageable) {
        if (StringUtils.isEmpty(tagId)) {
            Slice<Memo> memos = memoRepository.findAll(pageable);
            return memos.map(memo -> new MemoDTO(memo, tagRepository));
        }

        Slice<Memo> memos = memoRepository.findMemoIdsByTagId(tagId, pageable);
        return memos.map(memo -> new MemoDTO(memo, tagRepository));
    }

    @GetMapping("/{id}")
    public MemoDTO getUser(@PathVariable String id) {
        Memo memo = memoService.getMemoById(id);
        return new MemoDTO(memo, tagRepository);
    }

    @PutMapping("/{id}")
    public Memo updateUser(@PathVariable String id, @RequestBody Memo user) {
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
