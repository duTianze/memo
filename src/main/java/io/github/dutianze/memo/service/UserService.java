package io.github.dutianze.memo.service;

import io.github.dutianze.memo.entity.Note;
import io.github.dutianze.memo.exception.UserNotFoundException;
import io.github.dutianze.memo.exception.UserServiceException;
import io.github.dutianze.memo.repository.NoteRepository;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Service
public class UserService {
  private final NoteRepository userRepository;

  public UserService(NoteRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Note addUser(Note user) {
    try {
      return userRepository.save(user);
    } catch (Exception e) {
      throw new UserServiceException("Error adding the user");
    }
  }

  public Note getUserById(String userId) {
    return userRepository.findById(userId)
        .orElseThrow(() -> new UserNotFoundException("User not found ID: " + userId));
  }

  public List<Note> getAllUsers() {
    return userRepository.findAll();
  }

  public Note updateUser(String id, Note updateUser) {
    userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("Invalid user ID: " + id));

    updateUser.setId(id);

    return userRepository.save(updateUser);
  }

  public boolean deleteUser(String userId) {
    if (userRepository.existsById(userId)) {
      userRepository.deleteById(userId);
      return true;
    } else {
      return false;
    }
  }
}
