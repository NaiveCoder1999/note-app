package com.springbootcourse.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootcourse.SpringbootCourseApplication;
import com.springbootcourse.exception.CourseNotFoundException;
import com.springbootcourse.model.Course;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.junit.Assert.*;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Integration test class for course controller
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = SpringbootCourseApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class CourseControllerIntegrationTest {

    @LocalServerPort
    private int port; // available with Spring Web MVC

    @Autowired
    private TestRestTemplate restTemplate;

    HttpHeaders requestHeaders = new HttpHeaders();



    @Test
    @Order(1)
    public void addlesson() {

        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction");

        HttpEntity<Course> requestEntity = new HttpEntity<>(course, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/instructors/coder/courses"),
                HttpMethod.POST, requestEntity, String.class);

        String actual = String.valueOf(response.getHeaders().getLocation());

        assertEquals(HttpStatus.CREATED.value(), response.getStatusCode().value());
        assertTrue(actual.contains("/instructors/coder/courses"));

    }

    @Test
    @Order(2)
    public void updatelesson() throws Exception {

        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");

        HttpEntity<Course> entity = new HttpEntity<>(course, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/instructors/coder/courses" + "/" + course.getId()),
                HttpMethod.PUT, entity, String.class);

        assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());

        String expected = new ObjectMapper().writeValueAsString(course);

        JSONAssert.assertEquals(expected, response.getBody(), false);

    }

    @Test
    @Order(3)
    public void testGetLesson() throws Exception{

        Course course = new Course(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        HttpEntity<String> entity = new HttpEntity<>(null, requestHeaders);

        ResponseEntity<String> response1 = restTemplate.exchange(
                createURLWithPort("/instructors/coder/courses" + "/" + course.getId()),
                HttpMethod.GET, entity, String.class);

        String expected = new ObjectMapper().writeValueAsString(course);

        JSONAssert.assertEquals(expected, response1.getBody(), false);

    }

    @Test
    @Order(4)
    public void testDeleteLesson() {
        Course lesson = restTemplate.getForObject(createURLWithPort("/instructors/coder/courses/10001"),
                Course.class);
        assertNotNull(lesson);

        HttpEntity<String> entity = new HttpEntity<>(null, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/instructors/coder/courses/10001"),
                HttpMethod.DELETE, entity, String.class);

        Assertions.assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatusCode().value());

        try {
            lesson = restTemplate.getForObject("/instructors/coder/courses/10001", Course.class);
        } catch (CourseNotFoundException e) {
            assertEquals("Course id not found : 1", e.getMessage());
        }
    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }
}
