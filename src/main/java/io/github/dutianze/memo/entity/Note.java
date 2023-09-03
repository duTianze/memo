package io.github.dutianze.memo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Data
@Entity
public class Note {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String title;

  private String content;

  public Note() {
    this.title = "";
    this.content = "";
  }

  public Note(String name, String email) {
    this.title = name;
    this.content = email;
  }
}