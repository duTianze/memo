package io.github.dutianze.memo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * <a href="http://localhost:12190/swagger-ui/index.html">swagger-ui</a>
 */
@EnableJpaAuditing
@SpringBootApplication
public class MemoApplication {

    public static void main(String[] args) {
        SpringApplicationBuilder builder = new SpringApplicationBuilder(MemoApplication.class);
        builder.headless(false);
        builder.run(args);
    }

}
