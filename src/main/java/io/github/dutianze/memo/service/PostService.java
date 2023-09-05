package io.github.dutianze.memo.service;

import io.github.dutianze.memo.controller.PostDTO;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.PostTag;
import io.github.dutianze.memo.entity.Tag;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.exception.NoteServiceException;
import io.github.dutianze.memo.repository.PostRepository;
import io.github.dutianze.memo.repository.PostTagRepository;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final TagRepository tagRepository;
    private final PostTagRepository postTagRepository;

    public Post addNote(PostDTO postDTO) {
        try {
            Post post = postRepository.save(new Post(postDTO));
            List<Tag> tags = tagRepository.findAllById(postDTO.getTagIds());
            List<PostTag> postTags = post.linkTag(tags);
            postTagRepository.saveAll(postTags);
            return post;
        } catch (Exception e) {
            throw new NoteServiceException("Error adding the note");
        }
    }

    public Post getNoteById(Long noteId) {
        return postRepository.findById(noteId)
                             .orElseThrow(() -> new NoteNotFoundException("Post not found ID: " + noteId));
    }

    public List<Post> getAllNotes() {
        return postRepository.findAll(Sort.by(Direction.DESC, "createTime"));
    }

    public Post updateNote(Long id, Post updateNote) {
        postRepository.findById(id)
                      .orElseThrow(() -> new NoteNotFoundException("Invalid note ID: " + id));

        updateNote.setId(id);

        return postRepository.save(updateNote);
    }

    public boolean deleteNote(Long noteId) {
        if (postRepository.existsById(noteId)) {
            postRepository.deleteById(noteId);
            return true;
        } else {
            return false;
        }
    }
}
