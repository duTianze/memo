package io.github.dutianze.memo.service;

import io.github.dutianze.memo.controller.dto.MemoDTO;
import io.github.dutianze.memo.controller.dto.MemoSaveCmd;
import io.github.dutianze.memo.entity.Memo;
import io.github.dutianze.memo.entity.MemoTag;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.exception.NoteServiceException;
import io.github.dutianze.memo.repository.ImageRepository;
import io.github.dutianze.memo.repository.MemoRepository;
import io.github.dutianze.memo.repository.MemoTagRepository;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Stream;

import static io.github.dutianze.memo.controller.ChannelController.TRASH;

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
    private final ImageRepository imageRepository;

    @Transactional
    public MemoDTO saveMemo(String channelId, MemoSaveCmd memoSaveCmd) {
        try {
            Memo memoRequest = memoSaveCmd.newMemo(channelId);
            this.clearRemovedImage(memoRequest);
            Memo memo = memoRepository.save(memoRequest);
            this.clearOrAddTag(memo, memoSaveCmd);
            return new MemoDTO(memo, tagRepository);
        } catch (Exception e) {
            log.error("add memo error", e);
            throw new NoteServiceException("Error adding the memo");
        }
    }

    private void clearRemovedImage(Memo memoRequest) {
        if (StringUtils.isEmpty(memoRequest.getId())) {
            return;
        }
        Optional<Memo> memoOptional = memoRepository.findById(memoRequest.getId());
        if (memoOptional.isEmpty()) {
            return;
        }

        List<String> preBackground = memoOptional.get().getBackground();
        HashSet<String> newBackground = new HashSet<>(memoRequest.getBackground());
        List<String> removeImageList = preBackground.stream()
                                                    .filter(item -> !newBackground.contains(item))
                                                    .toList();
        imageRepository.deleteAllById(removeImageList);
    }

    private void clearOrAddTag(Memo memo, MemoSaveCmd memoSaveCmd) {
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

    @Transactional
    public boolean deleteMemo(String channelId, String memoId) {
        Optional<Memo> memoOptional = memoRepository.findById(memoId);
        if (memoOptional.isPresent()) {
            if (TRASH.getId().equals(channelId)) {
                memoRepository.deleteById(memoId);
            } else {
                Memo memo = memoOptional.get();
                memo.setChannelId(TRASH.getId());
                memoRepository.save(memo);
            }
            memoTagRepository.deleteByMemoId(memoId);
            return true;
        }
        return false;
    }
}
