package com.springbootcourse.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CourseNotFoundException extends RuntimeException{

    public CourseNotFoundException() {
        super();
    }

    /**
     * Constructs a new runtime exception for not finding course's id
     * call to {@link #initCause}.
     *
     * @param id the course id that is not existed. The detail message is saved for
     *                later retrieval by the {@link #getMessage()} method.
     */
    public CourseNotFoundException(long id) {
        super("Course ID not found: " + id);
    }


}
