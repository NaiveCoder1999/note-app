package com.springbootnote.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootnote.model.Note;
import com.springbootnote.service.NoteService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

/**
 * Unit test class for note controller
 */
@Disabled("This test is disabled for oauth2 resource server config enabled")
@ExtendWith(SpringExtension.class)
@WebMvcTest(value = NoteController.class)
@AutoConfigureMockMvc
@WithMockUser(username="coder", roles={"USER","ADMIN"})
class NoteControllerUnitTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NoteService noteService;

    //object <-> json
    private static final ObjectMapper om = new ObjectMapper();


    Note mockNote = new Note(10001L, "NodeJS", "coder", "TestJava10001");
    //String mockNoteJson = "{\"id\":10001,\"noteName\":\"NodeJS\",\"userName\":\"coder\",\"description\":\"TestJava10001\"}";
    String mockNoteJson = om.writeValueAsString(mockNote);

    NoteControllerUnitTest() throws JsonProcessingException {
    }

    @Test
    void createNote() throws Exception {
        //Note note = new Note(10001L, "NodeJS", "coder", "TestJava10001");
        Mockito.when(noteService.createNote
                (Mockito.any(Note.class))).thenReturn(mockNote);

        //invoke controller to create
        RequestBuilder request = MockMvcRequestBuilders.
                post("/user/coder/notes")
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
                get("/user/coder/notes").accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();

        JSONAssert.assertEquals(notesJson,
                result.getResponse().getContentAsString(), false);
    }

    @Test
    void getNote() throws Exception {
        when(noteService.getNote
                (10001L, "coder")).thenReturn(mockNote);

        //invoke controller
        RequestBuilder request = MockMvcRequestBuilders.
                get("/user/coder/notes/10001").accept(MediaType.APPLICATION_JSON);

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
                .contentType(MediaType.APPLICATION_JSON).content(mockNoteJson);

        MvcResult result = mockMvc.perform(request).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());

        JSONAssert.assertEquals(mockNoteJson, result.getResponse().getContentAsString(), false);

    }

    @Test
    void deletenote() throws Exception {
        Mockito.doNothing().when(noteService).deleteNote(10001L, "coder");

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/user/coder/notes/10001");

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatus());
    }
}