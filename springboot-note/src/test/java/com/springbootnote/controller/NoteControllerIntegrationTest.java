package com.springbootnote.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootnote.SpringbootNoteApplication;
import com.springbootnote.exception.NoteNotFoundException;
import com.springbootnote.model.Note;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * Integration test class for note controller
 */
@Disabled("This test is disabled for oauth2 resource server config enabled")
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = SpringbootNoteApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc // for mocking oauth2
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class NoteControllerIntegrationTest {

    @LocalServerPort
    private int port; // available with Spring Web MVC

    @Autowired
    private TestRestTemplate restTemplate;

    HttpHeaders requestHeaders = new HttpHeaders();



    @Test
    @Order(1)
    public void addNote() {

        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction");

        HttpEntity<Note> requestEntity = new HttpEntity<>(note, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/user/coder/notes"),
                HttpMethod.POST, requestEntity, String.class);

        String actual = String.valueOf(response.getHeaders().getLocation());

        Assertions.assertEquals(HttpStatus.CREATED.value(), response.getStatusCode().value());
        Assertions.assertTrue(actual.contains("/user/coder/notes"));

    }

    @Test
    @Order(2)
    public void updateNote() throws Exception {

        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");

        HttpEntity<Note> entity = new HttpEntity<>(note, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/user/coder/notes" + "/" + note.getId()),
                HttpMethod.PUT, entity, String.class);

        Assertions.assertEquals(HttpStatus.OK.value(), response.getStatusCode().value());

        String expected = new ObjectMapper().writeValueAsString(note);

        JSONAssert.assertEquals(expected, response.getBody(), false);

    }

    @Test
    @Order(3)
    public void testGetNote() throws Exception{

        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        HttpEntity<String> entity = new HttpEntity<>(null, requestHeaders);

        ResponseEntity<String> response1 = restTemplate.exchange(
                createURLWithPort("/user/coder/notes" + "/" + note.getId()),
                HttpMethod.GET, entity, String.class);

        String expected = new ObjectMapper().writeValueAsString(note);

        JSONAssert.assertEquals(expected, response1.getBody(), false);

    }

    @Test
    @Order(4)
    public void testDeleteNote() {
        Note note = restTemplate.getForObject(createURLWithPort("/user/coder/notes/10001"),
                Note.class);
        Assertions.assertNotNull(note);

        HttpEntity<String> entity = new HttpEntity<>(null, requestHeaders);

        ResponseEntity<String> response = restTemplate.exchange(
                createURLWithPort("/user/coder/notes/10001"),
                HttpMethod.DELETE, entity, String.class);

        Assertions.assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatusCode().value());

        try {
            note = restTemplate.getForObject("/user/coder/notes/10001", Note.class);
        } catch (NoteNotFoundException e) {
            Assertions.assertEquals("Note id not found : 10001", e.getMessage());
        }
    }

    private String createURLWithPort(String uri) {
        return "http://localhost:" + port + uri;
    }
}
