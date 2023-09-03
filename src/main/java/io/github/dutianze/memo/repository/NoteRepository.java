package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Repository
public interface NoteRepository extends JpaRepository<Note, String> {

}
