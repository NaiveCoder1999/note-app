package com.springbootcourse.service;

import com.springbootcourse.model.Course;

import java.util.List;

public interface CourseService {

    Course createCourse(Course course);
    /**
     * Get single course info by instructor and course id
     * There may be multiple courses taught by an instructor
     * @param id ID of course
     * @param instructorName course's instructor name
     * @return
     */
    Course getCourse(long id, String instructorName);
    List<Course> getAllCourses(String instructorName);
    Course updateCourse(long id, String instructorName);
    void deleteCourse(long id, String instructorName);

}
