package com.springbootnote.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootnote.model.Note;
import com.springbootnote.service.NoteService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

/**
 * Unit test class with mocking oauth for note controller
 */
@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = NoteController.class)
@WebMvcTest(value = NoteController.class)
//@Import(NoteController.class)
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
//@WithMockUser(username = "coder", password = "coderCdx", roles = {"USER", "ADMIN"})
class NoteControllerOAuth2UnitTest {

    //object <-> json
    private static final ObjectMapper om = new ObjectMapper();
    Note mockNote = new Note(10001L, "NodeJS", "coder", "TestJava10001");
    String mockNoteJson = om.writeValueAsString(mockNote);
    @Autowired
    private WebApplicationContext context;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NoteService noteService;

    private Jwt jwt;

    NoteControllerOAuth2UnitTest() throws JsonProcessingException {
    }

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        jwt = Jwt.withTokenValue("token")
                .header("kid", "foo")
                .header("alg", "RS256")
                .claim(StandardClaimNames.SUB, "coder")
                .claim("aud", "note-client")
                .claim(StandardClaimNames.EMAIL, "dxchen1999@gmail.com")
                .build();
    }

    @Test
    void createNote() throws Exception {
        //Note note = new Note(10001L, "NodeJS", "coder", "TestJava10001");
        Mockito.when(noteService.createNote
                (Mockito.any(Note.class))).thenReturn(mockNote);
//        Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
//        JwtAuthenticationToken token = new JwtAuthenticationToken(jwt, authorities);
        //invoke controller to create
        RequestBuilder request = MockMvcRequestBuilders.
                post("/user/coder/notes")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))

//                .with(authentication(token))
                .content(mockNoteJson).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.CREATED.value(), response.getStatus()); //expected 201 status code
        assertEquals("http://localhost/user/coder/notes/10001",
                response.getHeader(HttpHeaders.LOCATION)); //or by contains

    }

    @Test
    void getAllNotes() throws Exception {
        List<Note> notes = Arrays.asList(
                new Note(10001L, "Java", "coder", "Learn Java"),
                new Note(10002L, "Spring", "coder", "Learn Spring")

        );

        String notesJson = om.writeValueAsString(notes);

        when(noteService.getAllNotes("coder")).thenReturn(notes);

        //assertEquals(notes, noteService.getAllNotes("coder"));
        //invoke controller
        RequestBuilder request = MockMvcRequestBuilders.
                get("/user/coder/notes")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();

        JSONAssert.assertEquals(notesJson,
                result.getResponse().getContentAsString(), false);
    }

    @Test
    void getNote() throws Exception {
        when(noteService.getNote
                (10001L, "coder")).thenReturn(mockNote);

        //invoke controller
        RequestBuilder request = MockMvcRequestBuilders
        .get("/user/coder/notes/10001")
                 .with(jwt()
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                        new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();

        JSONAssert.assertEquals(mockNoteJson,
                result.getResponse().getContentAsString(), false);
    }

    @Test
    void updateNote() throws Exception {
        when(noteService.updateNote(Mockito.anyLong(),
                Mockito.anyString(), Mockito.any(Note.class)))
                .thenReturn(mockNote);

        RequestBuilder request = MockMvcRequestBuilders
                .put("/user/coder/notes/10001")
                .with(jwt()
                        .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                                new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt))
                .contentType(MediaType.APPLICATION_JSON).content(mockNoteJson);

        MvcResult result = mockMvc.perform(request).andReturn();

        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());

        JSONAssert.assertEquals(mockNoteJson, response.getContentAsString(), false);

    }

    @Test
    void deleteNote() throws Exception {
        Mockito.doNothing().when(noteService).deleteNote(10001L, "coder");

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/user/coder/notes/10001")
.with(jwt()
                .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER"),
                        new SimpleGrantedAuthority("ROLE_ADMIN"))).jwt(jwt));

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
    }
}