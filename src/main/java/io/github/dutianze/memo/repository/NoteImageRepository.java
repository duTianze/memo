package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.NoteImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@Repository
public interface NoteImageRepository extends JpaRepository<NoteImage, String> {

}
