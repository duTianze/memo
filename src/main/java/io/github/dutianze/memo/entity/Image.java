package io.github.dutianze.memo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.util.unit.DataSize;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Image extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "disk_size_kb")
    private Long diskSize;

    @Column(name = "image_data")
    private byte[] imageData;

    public Image(byte[] imageData) {
        this.imageData = imageData;
        DataSize dataSize = DataSize.ofBytes(imageData.length);
        this.diskSize = dataSize.toKilobytes();
    }

    public String getURL(String domain) {
        return String.format("%s/api/image/%s", domain, this.id);
    }
}
