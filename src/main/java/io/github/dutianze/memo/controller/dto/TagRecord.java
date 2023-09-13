package io.github.dutianze.memo.controller.dto;

import io.github.dutianze.memo.entity.Tag;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author dutianze
 * @date 2023/9/13
 */
@Data
@NoArgsConstructor
public class TagRecord {

    private String value;
    private String label;

    public TagRecord(Tag tag) {
        this.value = tag.getId();
        this.label = tag.getName();
    }
}
