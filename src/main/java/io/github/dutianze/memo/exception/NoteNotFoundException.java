package io.github.dutianze.memo.exception;

/**
 * @author dutianze
 * @date 2023/8/11
 */
public class NoteNotFoundException extends RuntimeException {

  public NoteNotFoundException(String message) {
    super(message);
  }
}
