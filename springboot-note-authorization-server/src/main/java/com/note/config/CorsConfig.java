package com.note.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://127.0.0.1:3000");
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("http://127.0.0.1:4200");
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedOrigin("http://127.0.0.1:8080");
        config.addAllowedOrigin("http://localhost:8080"); // add h2 database url
        config.addAllowedOrigin("http://127.0.0.1");
        config.addAllowedOrigin("http://localhost"); // add h2 database url
        config.addAllowedHeader("*");
        //config.addAllowedMethod("GET");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //source.registerCorsConfiguration("/oauth2/**", config);
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
