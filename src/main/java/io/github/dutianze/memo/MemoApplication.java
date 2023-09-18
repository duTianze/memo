package io.github.dutianze.memo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * <a href="http://localhost:8080/swagger-ui/index.html">swagger-ui</a>
 */
@EnableJpaAuditing
@SpringBootApplication
public class MemoApplication {

    public static void main(String[] args) {
//        SpringApplication.run(MemoApplication.class, args);
        SpringApplicationBuilder builder = new SpringApplicationBuilder(MemoApplication.class);
        builder.headless(false);
        ConfigurableApplicationContext context = builder.run(args);
    }

}
