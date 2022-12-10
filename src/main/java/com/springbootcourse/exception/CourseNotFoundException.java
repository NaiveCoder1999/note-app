package com.springbootcourse.exception;

public class CourseNotFoundException extends RuntimeException{

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
