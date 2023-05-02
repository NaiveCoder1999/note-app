package com.springbootnote.repository;

import com.springbootnote.model.NoteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * JPA Repository for query notes by name and user's name
 */
@Repository
public interface NoteUserRepository extends JpaRepository<NoteUser, Long> {

    //Optional<NoteUser> findById(Long id);
    Optional<NoteUser> findByUsername(String username);
    Optional<NoteUser> findByUsernameOrId(String username, Long id);

    Boolean existsByUsername(String username);






}
