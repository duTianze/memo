package io.github.dutianze.memo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.dutianze.memo.controller.PostDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author dutianze
 * @date 2023/8/11
 */
@Data
@Entity
@EntityListeners(value = AuditingEntityListener.class)
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String title;

    @Column
    private String backgroundImage;

    @Column
    private String content;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    public Post(PostDTO postDTO) {
        this.title = postDTO.getTitle();
        this.content = postDTO.getContent();
        this.backgroundImage = postDTO.getBackgroundImage();
    }

    public List<PostTag> linkTag(List<Tag> tags) {
        return tags.stream()
                   .map(tag -> new PostTag(this, tag.getId()))
                   .toList();
    }
}