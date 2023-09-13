package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Memo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Repository
public interface MemoRepository extends JpaRepository<Memo, String> {

    @Query("""
            select distinct memo
            from Memo memo
            inner join MemoTag memoTag on memo.id = memoTag.memoId
            where memoTag.tagId = :tagId
            """)
    Slice<Memo> findMemoIdsByTagId(@Param("tagId") String tagId, Pageable pageable);
}
