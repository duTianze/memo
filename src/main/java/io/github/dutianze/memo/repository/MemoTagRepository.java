package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.MemoTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

/**
 * @author dutianze
 * @date 2023/9/6
 */
@Repository
public interface MemoTagRepository extends JpaRepository<MemoTag, String> {

    Set<MemoTag> findByMemoId(String memoId);

    @Modifying
    @Query("""
            update MemoTag memoTag
            set memoTag.channelId = :currentChannelId
            where memoTag.channelId = :preChannelId
            """)
    void updateChannel(String preChannelId, String currentChannelId);

    void deleteByMemoId(String memoId);
}
