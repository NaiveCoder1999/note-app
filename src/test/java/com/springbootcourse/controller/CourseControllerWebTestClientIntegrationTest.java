package com.springbootcourse.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootcourse.SpringbootCourseApplication;
import com.springbootcourse.model.Course;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Integration test class for course controller
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = SpringbootCourseApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class CourseControllerWebTestClientIntegrationTest {

    @LocalServerPort
    private int port; // available with Spring Web MVC

    @Autowired
    private WebTestClient webTestClient; //auto bind to controller

    //@Autowired
    //private TestRestTemplate restTemplate;

    HttpHeaders requestHeaders = new HttpHeaders();

    @Test
    @Order(1)
    void createCourse() {
        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction");
        //ResponseEntity<String> response = null;
        this.webTestClient
                .post()
                .uri("/instructors/coder/courses")
                .body(Mono.just(course), Course.class)
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().location("http://localhost:" + port + "/instructors/coder/courses/10001");
    }

    @Test
    @Order(2)
    void updateCourse() throws JsonProcessingException {
        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        this.webTestClient
                .put()
                .uri("/instructors/coder/courses" + "/" + course.getId())
                .body(Mono.just(course), Course.class)
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isOk()
                //.expectBody(Course.class)
                .expectBody().json(new ObjectMapper().writeValueAsString(course),false);
    }



    @Test
    @Order(3)
    void getCourse() throws JsonProcessingException {
        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        this.webTestClient
                .get()
                .uri("/instructors/coder/courses" + "/" + course.getId())
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectBody().json(new ObjectMapper().writeValueAsString(course),false);
    }

    @Test
    @Order(4)
    void deleteCourse() {
        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction");
        this.webTestClient
                .delete()
                .uri("/instructors/coder/courses" + "/" + course.getId())
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isNoContent();
    }
}