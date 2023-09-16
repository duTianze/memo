package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Memo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Repository
public interface MemoRepository extends JpaRepository<Memo, String> {

    Slice<Memo> findAllByChannelId(String channelId, Pageable pageable);

    @Query("""
            select memo
            from Memo memo
            where memo.id in (
                select memoTag.memoId
                from MemoTag memoTag
                where memoTag.tagId in :tagIds and memoTag.channelId = :channelId
                group by memoTag.memoId
                having count(1) = :size
            )
            """)
    Slice<Memo> findMemoIdsByTagId(@Param("channelId") String channelId,
                                   @Param("tagIds") List<String> tagIds,
                                   @Param("size") int size, Pageable pageable);

    @Modifying
    @Query("""
            update Memo memo
            set memo.channelId = :currentChannelId
            where memo.channelId = :preChannelId
            """)
    void updateChannel(String preChannelId, String currentChannelId);
}
