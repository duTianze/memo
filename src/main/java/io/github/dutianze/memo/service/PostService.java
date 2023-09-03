package io.github.dutianze.memo.service;

import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.exception.NoteServiceException;
import io.github.dutianze.memo.repository.PostRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Service
@RequiredArgsConstructor
public class PostService {

  private final PostRepository postRepository;

  public Post addNote(Post note) {
    try {
      return postRepository.save(note);
    } catch (Exception e) {
      throw new NoteServiceException("Error adding the note");
    }
  }

  public Post getNoteById(String noteId) {
    return postRepository.findById(noteId)
        .orElseThrow(() -> new NoteNotFoundException("Post not found ID: " + noteId));
  }

  public List<Post> getAllNotes() {
    return postRepository.findAll(Sort.by(Direction.DESC, "createTime"));
  }

  public Post updateNote(String id, Post updateNote) {
    postRepository.findById(id)
        .orElseThrow(() -> new NoteNotFoundException("Invalid note ID: " + id));

    updateNote.setId(id);

    return postRepository.save(updateNote);
  }

  public boolean deleteNote(String noteId) {
    if (postRepository.existsById(noteId)) {
      postRepository.deleteById(noteId);
      return true;
    } else {
      return false;
    }
  }
}
