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

import java.net.URI;

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
        if (StringUtils.isEmpty(imageId)) {
            return "";
        }
        return String.format("/api/image/%s", imageId);
    }

    public static String getId(String imageUrl) {
        if (StringUtils.isEmpty(imageUrl)) {
            return null;
        }
        URI uri = URI.create(imageUrl);
        return StringUtils.substringAfterLast(uri.getPath(), "/");
    }
}
