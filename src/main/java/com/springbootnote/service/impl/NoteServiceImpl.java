package com.springbootnote.service.impl;

import com.springbootnote.exception.NoteNotFoundException;
import com.springbootnote.model.Note;
import com.springbootnote.repository.NoteRepository;
import com.springbootnote.service.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteServiceImpl implements NoteService {

    private static final Logger logger = LoggerFactory.getLogger(NoteServiceImpl.class);

    @Autowired
    private NoteRepository noteRepository;

    @Override
    public Note createNote(Note note) {
        Note createdNote = noteRepository.save(note);
        return createdNote;
    }

    @Override
    public Note getNote(long id, String userName) {
        logger.trace("Invoked getNote by ID method");
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            return note.get();
        } else {
            throw new NoteNotFoundException(id);
        }
    }

    @Override
    public List<Note> getAllNotes(String userName) {
        logger.trace("Invoked getAllNotes method");
        List<Note> notes = noteRepository.findByUserName(userName);

        return notes;
    }

    @Override
    public Note updateNote(long id, String userName, Note note) {
        logger.trace("Invoked updateNote by ID method");
        Optional<Note> noteCreated = noteRepository.findById(id);
        if (!noteCreated.isPresent()) {
            throw new NoteNotFoundException(id);
        } else {
            Note noteUpdated = noteRepository.save(note);
            return noteUpdated;
        }
    }

    @Override
    public void deleteNote(long id, String userName) { //similar to get method
        logger.trace("Invoked deleteNote by ID method");
        Optional<Note> note = noteRepository.findById(id);
        if (note.isPresent()) {
            noteRepository.deleteById(id);
        } else {
            throw new NoteNotFoundException(id);
        }
    }
}