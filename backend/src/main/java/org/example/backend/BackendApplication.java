package org.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@SpringBootApplication
public class BackendApplication {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    // this one just check if the database is connected
    @GetMapping("/test-connection")
    public String testConnection() {
        String sql = "SELECT 1";
        jdbcTemplate.queryForList(sql);
        return "Connection test successful!";
    }

    // this one checks if the flyway is working(maybe)
    @GetMapping("/test-data")
    public ResponseEntity<List<Map<String, Object>>> getDummyData() {
        try {
            String sql = "SELECT * FROM users";
            List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(List.of(Map.of("error", e.getMessage())));
        }
    }
}
