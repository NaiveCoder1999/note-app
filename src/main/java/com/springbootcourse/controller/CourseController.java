package com.springbootcourse.controller;

import com.springbootcourse.model.Course;
import com.springbootcourse.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/instructors")
public class CourseController {

    @Autowired
    private CourseService courseService;

    //@PostMapping("/instructors/{instructorName}/courses")
    @PostMapping("/{instructorName}/courses")
    public ResponseEntity<Void> createCourse(@PathVariable String instructorName, @RequestBody Course course) {
        course.setInstructorName(instructorName);
        Course createdCourse = courseService.createCourse(course); //no need to pass instructor
        if (createdCourse == null) {
            return ResponseEntity.noContent().build(); //204 – No Content Status
        }

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createdCourse.getId()).toUri(); //TODO
        return ResponseEntity.created(uri).build(); //201 -Created
    }

    //@GetMapping("/instructors/{instructorName}/courses")
    @GetMapping("/{instructorName}/courses")
    public List<Course> getAllCourses(@PathVariable String instructorName) {
        List<Course> courses = courseService.getAllCourses(instructorName);
        return courses;
    }

    @GetMapping("/{instructorName}/courses/{id}")
    public Course getCourse(@PathVariable long id, @PathVariable String instructorName) {
        return courseService.getCourse(id, instructorName);
    }

}
