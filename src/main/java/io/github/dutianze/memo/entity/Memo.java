package io.github.dutianze.memo.entity;

import io.github.dutianze.memo.entity.common.AuditModel;
import io.github.dutianze.memo.entity.common.StringListConverter;
import io.github.dutianze.memo.entity.common.TSIDGenerator;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Data
@Entity
@Table(indexes = {@Index(name = "memo_channel_id_idx", columnList = "channel_id")})
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Memo extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column(name = "channel_id")
    private String channelId;

    @Column
    private String title;

    @Column(name = "background")
    @Convert(converter = StringListConverter.class)
    private List<String> background;

    @Column(name = "content")
    private String content;

    @Column(name = "spoiler")
    private String spoiler;

    @Column(name = "rate")
    private Integer rate;

    public Memo(String channelId, String id, String title, List<String> background, String content, String spoiler,
                Integer rate) {
        this.channelId = channelId;
        this.id = id;
        this.title = title;
        this.background = background;
        this.content = content;
        this.spoiler = spoiler;
        this.rate = rate;
    }
}