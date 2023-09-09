package io.github.dutianze.memo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * @author dutianze
 * @date 2023/9/4
 */
@Data
@Entity
@Table(indexes = {@Index(name = "post_id_idx", columnList = "post_id"),
                  @Index(name = "tag_id_idx", columnList = "tag_id")})
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PostTag extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_id", insertable = false, updatable = false)
    private Long postId;

    @Column(name = "tag_id", insertable = false, updatable = false)
    private Long tagId;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public PostTag(Post post, Tag tag) {
        this.post = post;
        this.tag = tag;
    }
}
