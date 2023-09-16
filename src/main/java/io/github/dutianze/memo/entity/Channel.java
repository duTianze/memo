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
 * @date 2023/9/16
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Channel extends AuditModel {

    @Id
    @GeneratedValue(generator = "TSID")
    @GenericGenerator(name = "TSID", type = TSIDGenerator.class)
    private String id;

    @Column
    private String name;

    public Channel(String name) {
        this.name = name;
    }

    public Channel(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
