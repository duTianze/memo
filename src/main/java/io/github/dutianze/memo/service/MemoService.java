package io.github.dutianze.memo.service;

import io.github.dutianze.memo.controller.dto.MemoDTO;
import io.github.dutianze.memo.controller.dto.MemoSaveCmd;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.entity.MemoTag;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.exception.NoteServiceException;
import io.github.dutianze.memo.repository.MemoRepository;
import io.github.dutianze.memo.repository.MemoTagRepository;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MemoService {

    private final MemoRepository memoRepository;
    private final MemoTagRepository memoTagRepository;
    private final TagRepository tagRepository;

    public MemoDTO saveMemo(MemoSaveCmd memoSaveCmd) {
        try {
            Memo memo = memoRepository.save(memoSaveCmd.newMemo());
            Set<MemoTag> preMemoTags = memoTagRepository.findByMemoId(memo.getId());
            Set<MemoTag> currMemoTags = memoSaveCmd.newMemoTags(memo);
            List<MemoTag> addMemoTags = Stream.ofNullable(currMemoTags)
                                              .flatMap(Collection::stream)
                                              .filter(memoTag -> !preMemoTags.contains(memoTag))
                                              .toList();
            if (CollectionUtils.isNotEmpty(addMemoTags)) {
                memoTagRepository.saveAll(addMemoTags);
            }
            List<String> delMemoTagIdList = Stream.ofNullable(preMemoTags)
                                                  .flatMap(Collection::stream)
                                                  .filter(memoTag -> !currMemoTags.contains(memoTag))
                                                  .map(MemoTag::getId)
                                                  .toList();
            if (CollectionUtils.isNotEmpty(delMemoTagIdList)) {
                memoTagRepository.deleteAllById(delMemoTagIdList);
            }
            return new MemoDTO(memo, tagRepository);
        } catch (Exception e) {
            log.error("add memo error", e);
            throw new NoteServiceException("Error adding the memo");
        }
    }

    public Memo getMemoById(String noteId) {
        return memoRepository.findById(noteId)
                             .orElseThrow(() -> new NoteNotFoundException("Memo not found ID: " + noteId));
    }

    public List<Memo> getAllMemo() {
        return memoRepository.findAll(Sort.by(Direction.DESC, "createTime"));
    }

    public Memo updateMemo(String id, Memo memo) {
        memoRepository.findById(id)
                      .orElseThrow(() -> new NoteNotFoundException("Invalid memo ID: " + id));
        memo.setId(id);
        return memoRepository.save(memo);
    }

    public boolean deleteMemo(String memoId) {
        if (memoRepository.existsById(memoId)) {
            memoRepository.deleteById(memoId);
            return true;
        } else {
            return false;
        }
    }
}
