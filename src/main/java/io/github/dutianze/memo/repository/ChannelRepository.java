package io.github.dutianze.memo.repository;

import io.github.dutianze.memo.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author dutianze
 * @date 2023/9/5
 */
@Repository
public interface ChannelRepository extends JpaRepository<Channel, String> {

}
