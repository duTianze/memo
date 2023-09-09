package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("""
            select distinct post
            from Post post
            inner join PostTag postTag on post.id = postTag.postId
            where postTag.tagId = :tagId
            """)
    Page<Post> findPostIdsByTagId(@Param("tagId") Long tagId, Pageable pageable);
}
