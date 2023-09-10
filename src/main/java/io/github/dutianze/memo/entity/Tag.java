package io.github.dutianze.memo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author dutianze
 * @date 2023/9/3
 */
@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Tag extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    public Tag(Long id) {
        this.id = id;
    }

    public static Tag of(String name) {
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }
}
