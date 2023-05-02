package com.springbootnote.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NoteNotFoundException extends RuntimeException{

    public NoteNotFoundException() {
        super();
    }

    /**
     * Constructs a new runtime exception for not finding note's id
     * call to {@link #initCause}.
     *
     * @param id the note id that is not existed. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public NoteNotFoundException(long id) {
        super("Note ID not found: " + id);
    }


}
