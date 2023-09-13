package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, String> {

    @Query("""
            select tag
            from MemoTag memoTag
            left join Tag tag on tag.id = memoTag.tagId
            where memoTag.memoId = :memoId
            """)
    List<Tag> findByMemoId(String memoId);
}
