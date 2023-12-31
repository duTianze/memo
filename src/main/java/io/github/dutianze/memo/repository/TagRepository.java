package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Tag;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, String> {


    List<Tag> findAllByChannelId(String channelId, Sort sort);

    @Query("""
            select tag
            from MemoTag memoTag
            left join Tag tag on tag.id = memoTag.tagId
            where memoTag.memoId = :memoId
            """)
    List<Tag> findByMemoId(String memoId);


    @Query("""
            select tag
            from Tag tag
            where tag.id in (
                select distinct memoTag.tagId
                from MemoTag memoTag
                where memoTag.memoId in (
                    select memoTag.memoId
                    from MemoTag memoTag
                    where memoTag.tagId in :tagIds and memoTag.channelId = :channelId
                    group by memoTag.memoId
                    having count(1) = :size
                )
            )
            """)
    List<Tag> findByTagIds(@Param("channelId") String channelId,
                           @Param("tagIds") List<String> tagIds,
                           @Param("size") int size, Sort sort);

    @Modifying
    @Query("""
            update Tag tag
            set tag.channelId = :currentChannelId
            where tag.channelId = :preChannelId
            """)
    void updateChannel(String preChannelId, String currentChannelId);
}
