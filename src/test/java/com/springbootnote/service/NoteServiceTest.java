package com.springbootnote.service;

import com.springbootnote.exception.NoteNotFoundException;
import com.springbootnote.model.Note;
import com.springbootnote.repository.NoteRepository;
import com.springbootnote.service.impl.NoteServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class NoteServiceTest {

    // to use with when thenReturn
    @Mock
    private NoteRepository noteRepository;

    @InjectMocks
    private NoteService noteService = new NoteServiceImpl();

    @Test
    void createNote() {
        Note note = new Note(10001L, "Java", "coder", "Learn Java");
        when(noteRepository.save(note)).thenReturn(note);

        assertEquals(note, noteService.createNote(note));
    }

    @Test
    void getNote() {
        Note note = new Note(10001L, "Java", "coder", "Learn Java");
        when(noteRepository.findById(10001L)).thenReturn(Optional.of(note));
        assertEquals(note, noteService.getNote(10001L, "coder"));
    }

    @Test
    void getAllNotes() {
        List<Note> notes = Arrays.asList(
                new Note(10001L, "Java", "coder", "Learn Java"),
                new Note(10002L, "Spring", "coder", "Learn Spring")

        );
        when(noteRepository.findByUserName("coder")).thenReturn(notes);
        assertEquals(notes, noteService.getAllNotes("coder"));
    }

    @Test
    void updateNote() {
        Note note = new Note(10001L, "Java", "nocoder", "Learn Java");
        when(noteRepository.findById(10001L)).thenReturn(Optional.of(note));
        when(noteRepository.save(note)).thenReturn(note);
        assertEquals(note, noteService.updateNote(10001L, "nocoder", note));
    }

    @Test
    void deleteNote() {
        Note note = new Note(10001L, "Java", "coder", "Learn Java");

        when(noteRepository.findById(10001L)).thenReturn(Optional.of(note));
        noteService.deleteNote(10001L, "coder");

        //verify number of interactions with mock, set to 0 to verify no interaction
        verify(noteRepository, times(1)).deleteById(10001L);
    }

    @Test
    void getNoteNotFound() {
        NoteNotFoundException exception = assertThrows(
                NoteNotFoundException.class,
                () -> noteService.getNote(10001L, "coder"),
                "Note ID not found: 10001"
        );

        assertEquals("Note ID not found: 10001", exception.getMessage());
    }

    @Test
    void updateNoteNotFound() {
        Note note = new Note(10001L, "Java", "nocoder", "Learn Java");

        //when(noteRepository.findById(10001L)).thenThrow(NoteNotFoundException.class);
        NoteNotFoundException exception = assertThrows(
                NoteNotFoundException.class,
                () -> noteService.updateNote(10001L, "nocoder", note),
                "Note ID not found: 10001"
        );
        //cover the else branch:
        assertEquals("Note ID not found: 10001", exception.getMessage());
    }

    @Test
    void deleteNoteNotFound() {
        //when(noteRepository.findById(10001L)).thenThrow(NoteNotFoundException.class);
        NoteNotFoundException exception = assertThrows(
                NoteNotFoundException.class,
                () -> noteService.deleteNote(10001L, "coder")
        );

        assertEquals("Note ID not found: 10001", exception.getMessage());
    }
}