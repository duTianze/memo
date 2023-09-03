package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Repository
public interface PostRepository extends JpaRepository<Post, String> {

}
