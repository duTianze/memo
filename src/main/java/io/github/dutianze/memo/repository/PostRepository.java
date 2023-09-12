package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Post;
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
public interface PostRepository extends JpaRepository<Post, String> {

    @Query("""
            select distinct post
            from Post post
            inner join PostTag postTag on post.id = postTag.postId
            where postTag.tagId = :tagId
            """)
    Slice<Post> findPostIdsByTagId(@Param("tagId") String tagId, Pageable pageable);
}
