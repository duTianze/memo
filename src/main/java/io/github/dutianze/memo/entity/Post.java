package io.github.dutianze.memo.entity;

import io.github.dutianze.memo.controller.dto.PostDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String image;

    @Column
    private String content;

    public Post(String title, String image, String content) {
        this.title = title;
        this.image = image;
        this.content = content;
    }

    public Post(PostDTO postDTO) {
        this.title = postDTO.getTitle();
        this.content = postDTO.getContent();
        this.image = postDTO.getImage();
    }
}