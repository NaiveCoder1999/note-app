package com.springbootnote.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootnote.model.Note;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;

/**
 * Integration test class for note controller
 */
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc // for mocking oauth2
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class NoteControllerOAuth2IntegrationTest {

    //object <-> json
    private static final ObjectMapper om = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;
    private Jwt jwt;

    NoteControllerOAuth2IntegrationTest() throws JsonProcessingException {
    }

    @BeforeEach
    public void setup() {
        jwt = Jwt.withTokenValue("token")
                .header("kid", "foo")
                .header("alg", "RS256")
                .claim(StandardClaimNames.SUB, "coder")
                .claim("aud", "note-client")
                .claim(StandardClaimNames.EMAIL, "dxchen1999@gmail.com")
                .build();
    }

    @Test
    @Order(1)
    public void addNote() throws Exception {
        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction");
        String noteJson = om.writeValueAsString(note);

        RequestBuilder request = MockMvcRequestBuilders.
                post("/user/coder/notes")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))

//                .with(authentication(token))
                .content(noteJson).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.CREATED.value(), response.getStatus()); //expected 201 status code
        assertTrue(Objects.requireNonNull(response.getHeader(HttpHeaders.LOCATION)).contains("/user/coder/notes"));

    }

    @Test
    @Order(2)
    public void updateNote() throws Exception {

        Note note = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");
        String noteJson = om.writeValueAsString(note);
        RequestBuilder request = MockMvcRequestBuilders
                .put("/user/coder/notes/10001")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .contentType(MediaType.APPLICATION_JSON).content(noteJson);

        MvcResult result = mockMvc.perform(request).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());

        JSONAssert.assertEquals(noteJson, response.getContentAsString(), false);

    }

    @Test
    @Order(3)
    public void getNote() throws Exception {

        Note updatedNote = new Note(10001L, "SpringBoot", "coder", "Spring Boot Introduction updated");

        //invoke controller
        RequestBuilder request = MockMvcRequestBuilders
                .get("/user/coder/notes/10001")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();

        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());

        String expected = om.writeValueAsString(updatedNote);

        JSONAssert.assertEquals(expected, response.getContentAsString(), false);

    }

    @Test
    @Order(4)
    public void deleteNote() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/user/coder/notes/10001")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();
        MockHttpServletResponse response = result.getResponse();
        //check note created from create test
        Assertions.assertNotNull(response.getContentAsString());

        RequestBuilder deleteRequest = MockMvcRequestBuilders
                .delete("/user/coder/notes/10001")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt));

        result = mockMvc.perform(deleteRequest).andReturn();

        response = result.getResponse();
        // check if the note was deleted
        assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
        // double check that the note was deleted with get method
        response = mockMvc.perform(request).andReturn().getResponse();
        assertEquals(HttpStatus.NOT_FOUND.value(), response.getStatus());

    }


}
