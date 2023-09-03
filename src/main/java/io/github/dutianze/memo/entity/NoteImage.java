package io.github.dutianze.memo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.unit.DataSize;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@Data
@Entity
@NoArgsConstructor
public class NoteImage {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "disk_size_kb")
  private Long diskSize;

  @Column(name = "image_data")
  private byte[] imageData;

  public NoteImage(byte[] imageData) {
    this.imageData = imageData;
    DataSize dataSize = DataSize.ofBytes(imageData.length);
    this.diskSize = dataSize.toKilobytes();
  }
}
