package com.springbootnote.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootnote.SpringbootNoteApplication;
import com.springbootnote.model.Note;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Integration test class for note controller
 */

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = SpringbootNoteApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class NoteControllerWebTestClientIntegrationTest {

    @LocalServerPort
    private int port; // available with Spring Web MVC

    @Autowired
    private WebTestClient webTestClient; //auto bind to controller

    //@Autowired
    //private TestRestTemplate restTemplate;

    HttpHeaders requestHeaders = new HttpHeaders();

    @Test
    @Order(1)
    void createNote() {
        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction");
        //ResponseEntity<String> response = null;
        this.webTestClient
                .post()
                .uri("/user/coder/notes")
                .body(Mono.just(note), Note.class)
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isCreated()
                .expectHeader().location("http://localhost:" + port + "/user/coder/notes/10001");
    }

    @Test
    @Order(2)
    void updateNote() throws JsonProcessingException {
        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        this.webTestClient
                .put()
                .uri("/user/coder/notes" + "/" + note.getId())
                .body(Mono.just(note), Note.class)
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isOk()
                //.expectBody(Note.class)
                .expectBody().json(new ObjectMapper().writeValueAsString(note),false);
    }



    @Test
    @Order(3)
    void getNote() throws JsonProcessingException {
        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        this.webTestClient
                .get()
                .uri("/user/coder/notes" + "/" + note.getId())
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectBody().json(new ObjectMapper().writeValueAsString(note),false);
    }

    @Test
    @Order(4)
    void deleteNote() {
        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction");
        this.webTestClient
                .delete()
                .uri("/user/coder/notes" + "/" + note.getId())
                .header(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchange()
                .expectStatus().isNoContent();
    }
}