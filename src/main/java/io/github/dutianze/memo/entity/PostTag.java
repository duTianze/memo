package io.github.dutianze.memo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * @author dutianze
 * @date 2023/9/4
 */
@Data
@Entity
@EntityListeners(value = AuditingEntityListener.class)
@NoArgsConstructor
public class PostTag {

  @Id
  @GeneratedValue
  private Long id;

  @Column
  private String name;

  @Column(name = "post_id")
  private String postId;

  @Column(name = "tag_id")
  private String tagId;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("postId")
  private Post post;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("tagId")
  private Tag tag;

  @CreatedDate
  private LocalDateTime createTime;

  @LastModifiedDate
  private LocalDateTime updateTime;
}
