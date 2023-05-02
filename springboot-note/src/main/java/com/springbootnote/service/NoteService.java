package com.springbootnote.service;

import com.springbootnote.model.Note;

import java.util.List;

public interface NoteService {

    Note createNote(Note note);
    /**
     * Get single note info by user and note id
     * There may be multiple notes created by an user
     * @param id ID of note
     * @param userName note user's name
     */
    Note getNote(long id, String userName);
    List<Note> getAllNotes(String userName);
    Note updateNote(long id, String userName, Note note);
    void deleteNote(long id, String userName);

}
