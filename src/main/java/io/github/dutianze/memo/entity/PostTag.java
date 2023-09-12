package io.github.dutianze.memo.entity;

import io.github.dutianze.memo.entity.common.AuditModel;
import io.github.dutianze.memo.entity.common.TSIDGenerator;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

/**
 * @author dutianze
 * @date 2023/9/4
 */
@Data
@Entity
@Table(indexes = {@Index(name = "post_id_idx", columnList = "post_id"),
                  @Index(name = "tag_id_idx", columnList = "tag_id")})
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PostTag extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column(name = "post_id")
    private String postId;

    @Column(name = "tag_id")
    private String tagId;

    public PostTag(String postId, String tagId) {
        this.postId = postId;
        this.tagId = tagId;
    }
}
