package io.github.dutianze.memo.service;

import io.github.dutianze.memo.controller.dto.PostCreateCmd;
import io.github.dutianze.memo.controller.dto.PostDTO;
import io.github.dutianze.memo.entity.Post;
import io.github.dutianze.memo.entity.PostTag;
import io.github.dutianze.memo.exception.NoteNotFoundException;
import io.github.dutianze.memo.exception.NoteServiceException;
import io.github.dutianze.memo.repository.PostRepository;
import io.github.dutianze.memo.repository.PostTagRepository;
import io.github.dutianze.memo.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
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
    private final PostTagRepository postTagRepository;
    private final TagRepository tagRepository;

    public PostDTO addPost(PostCreateCmd postCreateCmd) {
        try {
            Post post = postRepository.save(postCreateCmd.newPost());
            List<PostTag> postTags = postCreateCmd.newPostTags(post);
            if (CollectionUtils.isNotEmpty(postTags)) {
                postTagRepository.saveAll(postTags);
            }
            return new PostDTO(post, tagRepository);
        } catch (Exception e) {
            throw new NoteServiceException("Error adding the post");
        }
    }

    public Post getPostById(Long noteId) {
        return postRepository.findById(noteId)
                             .orElseThrow(() -> new NoteNotFoundException("Post not found ID: " + noteId));
    }

    public List<Post> getAllPost() {
        return postRepository.findAll(Sort.by(Direction.DESC, "createTime"));
    }

    public Post updatePost(Long id, Post updateNote) {
        postRepository.findById(id)
                      .orElseThrow(() -> new NoteNotFoundException("Invalid post ID: " + id));

        updateNote.setId(id);

        return postRepository.save(updateNote);
    }

    public boolean deletePost(Long noteId) {
        if (postRepository.existsById(noteId)) {
            postRepository.deleteById(noteId);
            return true;
        } else {
            return false;
        }
    }
}
