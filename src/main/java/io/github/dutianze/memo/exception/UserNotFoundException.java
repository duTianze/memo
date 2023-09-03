package io.github.dutianze.memo.exception;

/**
 * @author dutianze
 * @date 2023/8/11
 */
public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String message) {
    super(message);
  }
}
