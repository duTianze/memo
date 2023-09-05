package io.github.dutianze.memo.controller;

import lombok.Data;

import java.util.List;

/**
 * @author dutianze
 * @date 2023/9/6
 */
@Data
public class PostDTO {

    private String title;

    private String backgroundImage;

    private String content;

    private List<Long> tagIds;
}
