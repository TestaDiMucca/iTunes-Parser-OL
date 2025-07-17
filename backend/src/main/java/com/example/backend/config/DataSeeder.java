package com.example.backend.config;

import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

/**
 * Seeds initial data when application starts (non-prod profile).
 */
@Component
@Profile("!prod")
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        String defaultUser = "admin";
        String defaultPass = "admin123";
        if (userService.getByUsername(defaultUser) == null) {
            userService.register(defaultUser, defaultPass);
            System.out.println("Seeded default user -> username: admin, password: admin123");
        }
    }
}
