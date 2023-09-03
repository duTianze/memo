package io.github.dutianze.memo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.util.unit.DataSize;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@Data
@Entity
@EntityListeners(value = AuditingEntityListener.class)
@NoArgsConstructor
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "disk_size_kb")
  private Long diskSize;

  @Column(name = "image_data")
  private byte[] imageData;

  @CreatedDate
  private LocalDateTime createTime;

  @LastModifiedDate
  private LocalDateTime updateTime;

  public Image(byte[] imageData) {
    this.imageData = imageData;
    DataSize dataSize = DataSize.ofBytes(imageData.length);
    this.diskSize = dataSize.toKilobytes();
  }

  public String getURL(String domain) {
    return String.format("%s/api/image/%s", domain, this.id);
  }
}
