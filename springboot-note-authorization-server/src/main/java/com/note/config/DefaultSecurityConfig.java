/*
 * Copyright 2020-2023 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.note.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * @author Joe Grandja
 * @since 0.1.0
 */
@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
public class DefaultSecurityConfig {
    // encoded password nocoder
    private static final String ENCODED_PASSWORD_NOCODER = "{bcrypt}$2a$10$krwHGYD6YOTVaHSVNXfBgunuEZsnnjB7mzi33qjhdV.Sb3BYNivYK";
    // encoded password coder
    private static final String ENCODED_PASSWORD_CODER = "{bcrypt}$2a$10$RKQkNYiehWPWNkWWAcnCw.0hn7MkZfm3Mo1PVF4Z/cIguryrQAQ7e";

    // encoded password guest
    private static final String ENCODED_PASSWORD_GUEST = "{bcrypt}$2a$10$BKfZg5AwLTv5Is9rwL7r8eosucyGyItX52tjqpbpHS8qlnnJuJnA6";
    // @formatter:off
    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize ->
                        authorize.anyRequest().authenticated()
                )
                .cors(withDefaults())
                // use default login page provided by spring-security
                .formLogin(withDefaults());
        return http.build();
    }

    // configure OAuth2 login user
    @Bean
    UserDetailsService users() {
        // add a guest account with same username and password
        UserDetails guestUser = User.withUsername("guest")
                .password(ENCODED_PASSWORD_GUEST)
                .roles("USER")
                .build();

                UserDetails user = User.withUsername("nocoder")
                .password(ENCODED_PASSWORD_NOCODER)
                .roles("USER","ADMIN") //define the user authorities, e.g. ROLE_ADMIN
                .build();

        UserDetails noteUser = User.withUsername("coder")
                .password(ENCODED_PASSWORD_CODER)
                .roles("USER","ADMIN")

                .build();

        return new InMemoryUserDetailsManager(user, noteUser, guestUser);
    }

    @Bean
    SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }

}
