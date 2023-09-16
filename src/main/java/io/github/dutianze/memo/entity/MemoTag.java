package io.github.dutianze.memo.entity;

import io.github.dutianze.memo.entity.common.AuditModel;
import io.github.dutianze.memo.entity.common.TSIDGenerator;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Objects;

/**
 * @author dutianze
 * @date 2023/9/4
 */
@Data
@Entity
@Table(indexes = {@Index(name = "memo_id_idx", columnList = "memo_id"),
                  @Index(name = "tag_id_idx", columnList = "tag_id"),
                  @Index(name = "memo_tag_channel_id_idx", columnList = "channel_id")})
@NoArgsConstructor
public class MemoTag extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column(name = "channel_id")
    private String channelId;

    @Column(name = "memo_id")
    private String memoId;

    @Column(name = "tag_id")
    private String tagId;

    public MemoTag(String channelId, String memoId, String tagId) {
        this.channelId = channelId;
        this.memoId = memoId;
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {return true;}
        if (o == null || getClass() != o.getClass()) {return false;}
        if (!super.equals(o)) {return false;}
        MemoTag memoTag = (MemoTag) o;
        return Objects.equals(memoId, memoTag.memoId) && Objects.equals(tagId, memoTag.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), memoId, tagId);
    }
}
