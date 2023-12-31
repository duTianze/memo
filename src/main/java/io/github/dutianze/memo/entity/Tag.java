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
 * @date 2023/9/3
 */
@Data
@Entity
@Table(indexes = {@Index(name = "tag_channel_id_idx", columnList = "channel_id")})
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Tag extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column(name = "channel_id")
    private String channelId;

    @Column
    private String name;

    public static Tag of(String channelId, String name) {
        Tag tag = new Tag();
        tag.setChannelId(channelId);
        tag.setName(name);
        return tag;
    }
}
