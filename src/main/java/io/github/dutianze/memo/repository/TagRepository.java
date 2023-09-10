package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query("""
            select tag
            from PostTag postTag
            left join Tag tag on tag.id = postTag.tagId
            where postTag.postId = :postId
            """)
    List<Tag> findByPostId(Long postId);


    Page<Tag> findByNameLike(String name, Pageable pageable);
}
