package com.springbootcourse.service.impl;

import com.springbootcourse.model.Course;
import com.springbootcourse.repository.CourseRepository;
import com.springbootcourse.service.CourseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private static final Logger logger = LoggerFactory.getLogger(CourseServiceImpl.class);

    @Autowired
    private CourseRepository courseRepository;
    @Override
    public Course createCourse(Course course) {
        Course createdCourse = courseRepository.save(course);
        return createdCourse;
    }

    @Override
    public Course getCourse(long id, String instructorName) {
        return null;
    }

    @Override
    public List<Course> getAllCourses(String instructorName) {
        logger.trace("Invoked getAllCourses method");
        List<Course> courses = courseRepository.findByInstructorName(instructorName);

        return courses;
    }

    @Override
    public Course updateCourse(long id, String instructorName) {
        return null;
    }

    @Override
    public void deleteCourse(long id, String instructorName) {

    }
}
