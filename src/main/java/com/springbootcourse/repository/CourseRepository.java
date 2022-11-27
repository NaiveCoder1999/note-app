package com.springbootcourse.repository;

import com.springbootcourse.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA Repository for query courses by name and user's name
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByCourseNameOrUserName(String courseName, String userName);
}
