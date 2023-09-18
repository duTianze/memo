package io.github.dutianze.memo.entity;

import io.github.dutianze.memo.entity.common.AuditModel;
import io.github.dutianze.memo.entity.common.TSIDGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.util.unit.DataSize;

import java.nio.file.Path;
import java.nio.file.Paths;

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
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
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

    public static String getURL(String imageId) {
        return String.format("%s/api/image/%s", "http://localhost:12190", imageId);
    }

    public static String getId(String imageUrl) {
        if (StringUtils.isEmpty(imageUrl)) {
            return null;
        }
        Path path = Paths.get(imageUrl);
        return path.getFileName().toString();
    }
}
