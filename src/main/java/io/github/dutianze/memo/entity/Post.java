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
import org.hibernate.annotations.GenericGenerator;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Post extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column
    private String title;

    @Column(name = "background_id")
    private String backgroundId;

    @Column
    private String content;

    public Post(String title, String backgroundId, String content) {
        this.title = title;
        this.backgroundId = backgroundId;
        this.content = content;
    }
}