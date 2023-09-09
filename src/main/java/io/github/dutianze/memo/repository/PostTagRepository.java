package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.PostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/9/6
 */
@Repository
public interface PostTagRepository extends JpaRepository<PostTag, Long> {

}
