package com.springbootnote.controller;

import com.springbootnote.model.Note;
import com.springbootnote.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
@RequestMapping("/user")
public class NoteController {

    //@Autowired
    private NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/{userName}/notes")
    public ResponseEntity<Void> createNote(@PathVariable String userName, @RequestBody Note note) {
        note.setUserName(userName);
        Note createdNote = noteService.createNote(note);
        if (createdNote == null) {
            return ResponseEntity.noContent().build(); //204 – No Content Status
        }

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdNote.getId()).toUri();
        return ResponseEntity.created(uri).build(); //201 -Created
    }

    @GetMapping("/{userName}/notes")
    public List<Note> getAllNotes(@PathVariable String userName) {
        return noteService.getAllNotes(userName);
    }

    @GetMapping("/{userName}/notes/{id}")
    public Note getNote(@PathVariable long id, @PathVariable String userName) {
        return noteService.getNote(id, userName);
    }

    @PutMapping("/{userName}/notes/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable long id, @PathVariable String userName,
                                           @RequestBody Note note) {
        note.setUserName(userName);
        Note noteUpdated = noteService.updateNote(id, userName, note);
        return new ResponseEntity<>(noteUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/{userName}/notes/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable long id, @PathVariable String userName) {
        noteService.deleteNote(id, userName); //TODO scan the delete status?
        return ResponseEntity.noContent().build();
    }



}
