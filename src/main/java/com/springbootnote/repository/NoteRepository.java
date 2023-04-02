package com.springbootnote.repository;

import com.springbootnote.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA Repository for query notes by name and user's name
 */
@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    //List<Note> findByNoteNameOrUserName(String noteName, String userName);
    List<Note> findByUserName(String userName);
    List<Note> findByNoteName(String noteName);

    Boolean existsByUserName(String userName);
    Boolean existsByNoteName(String noteName);
}
