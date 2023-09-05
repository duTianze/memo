package io.github.dutianze.memo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * @author dutianze
 * @date 2023/9/4
 */
@Data
@Entity
@EntityListeners(value = AuditingEntityListener.class)
@NoArgsConstructor
public class PostTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id", insertable = false, updatable = false)
    private Long postId;

    @Column
    private Long tagId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @CreatedDate
    private LocalDateTime createTime;

    @LastModifiedDate
    private LocalDateTime updateTime;


    public PostTag(Post post, Long tagId) {
        this.post = post;
        this.tagId = tagId;
    }
}
