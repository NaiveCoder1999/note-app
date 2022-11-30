package com.springbootcourse.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    @GeneratedValue
    private Long id;
    private String courseName;
    private String instructorName;
    private String description;

    public Course(Long id, String courseName, String instructorName, String description) {
        this.id = id;
        this.courseName = courseName;
        this.instructorName = instructorName;
        this.description = description;
    }

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public void setInstructorName(String userName) {
        this.instructorName = userName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
