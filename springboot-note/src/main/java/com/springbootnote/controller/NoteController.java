package com.springbootnote.controller;

import com.springbootnote.model.Note;
import com.springbootnote.service.NoteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
@RestController
@RequestMapping("/user")
public class NoteController {

    //@Autowired
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/{userName}/notes")
    @PreAuthorize("#userName == authentication.name")
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
    @PreAuthorize("#userName == authentication.name")
    public List<Note> getAllNotes(@PathVariable String userName) {
//        // Get the Authentication object from the SecurityContextHolder
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        // Get the authentication.name
//        String authenticatedUserName = authentication.getName();
//
//        // Debug output
//        System.out.println("Authenticated user name: " + authenticatedUserName);
        return noteService.getAllNotes(userName);
    }

    @GetMapping("/{userName}/notes/{id}")
    @PreAuthorize("#userName == authentication.name")
    public Note getNote(@PathVariable long id, @PathVariable String userName) {
        return noteService.getNote(id, userName);
    }

    @PutMapping("/{userName}/notes/{id}")
    @PreAuthorize("#userName == authentication.name")
    public ResponseEntity<Note> updateNote(@PathVariable long id, @PathVariable String userName,
                                           @RequestBody Note note) {
        note.setUserName(userName);
        Note noteUpdated = noteService.updateNote(id, userName, note);
        return new ResponseEntity<>(noteUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/{userName}/notes/{id}")
    @PreAuthorize("#userName == authentication.name")
    public ResponseEntity<Void> deleteNote(@PathVariable long id, @PathVariable String userName) {
        noteService.deleteNote(id, userName); //TODO scan the delete status?
        return ResponseEntity.noContent().build();
    }

}
