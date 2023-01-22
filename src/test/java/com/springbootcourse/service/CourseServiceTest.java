package com.springbootcourse.service;

import com.springbootcourse.exception.CourseNotFoundException;
import com.springbootcourse.model.Course;
import com.springbootcourse.repository.CourseRepository;
import com.springbootcourse.service.impl.CourseServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class CourseServiceTest {

    // to use with when thenReturn
    @Mock
    private CourseRepository courseRepository;

    @InjectMocks
    private CourseService courseService = new CourseServiceImpl();

    @Test
    void createCourse() {
        Course course = new Course(10001L, "Java", "coder", "Learn Java");
        when(courseRepository.save(course)).thenReturn(course);

        assertEquals(course, courseService.createCourse(course));
    }

    @Test
    void getCourse() {
        Course course = new Course(10001L, "Java", "coder", "Learn Java");
        when(courseRepository.findById(10001L)).thenReturn(Optional.of(course));
        assertEquals(course, courseService.getCourse(10001L, "coder"));
    }

    @Test
    void getAllCourses() {
        List<Course> courses = Arrays.asList(
                new Course(10001L, "Java", "coder", "Learn Java"),
                new Course(10002L, "Spring", "coder", "Learn Spring")

        );
        when(courseRepository.findByInstructorName("coder")).thenReturn(courses);
        assertEquals(courses, courseService.getAllCourses("coder"));
    }

    @Test
    void updateCourse() {
        Course course = new Course(10001L, "Java", "nocoder", "Learn Java");
        when(courseRepository.findById(10001L)).thenReturn(Optional.of(course));
        when(courseRepository.save(course)).thenReturn(course);
        assertEquals(course, courseService.updateCourse(10001L, "nocoder", course));
    }

    @Test
    void deleteCourse() {
        Course course = new Course(10001L, "Java", "coder", "Learn Java");

        when(courseRepository.findById(10001L)).thenReturn(Optional.of(course));
        courseService.deleteCourse(10001L, "coder");

        //verify number of interactions with mock, set to 0 to verify no interaction
        verify(courseRepository, times(1)).deleteById(10001L);
    }

    @Test
    void getCourseNotFound() {
        CourseNotFoundException exception = assertThrows(
                CourseNotFoundException.class,
                () -> courseService.getCourse(10001L, "coder"),
                "Course ID not found: 10001"
        );

        assertEquals("Course ID not found: 10001", exception.getMessage());
    }

    @Test
    void updateCourseNotFound() {
        Course course = new Course(10001L, "Java", "nocoder", "Learn Java");

        //when(courseRepository.findById(10001L)).thenThrow(CourseNotFoundException.class);
        CourseNotFoundException exception = assertThrows(
                CourseNotFoundException.class,
                () -> courseService.updateCourse(10001L, "nocoder", course),
                "Course ID not found: 10001"
        );
        //cover the else branch:
        assertEquals("Course ID not found: 10001", exception.getMessage());
    }

    @Test
    void deleteCourseNotFound() {
        //when(courseRepository.findById(10001L)).thenThrow(CourseNotFoundException.class);
        CourseNotFoundException exception = assertThrows(
                CourseNotFoundException.class,
                () -> courseService.deleteCourse(10001L, "coder")
        );

        assertEquals("Course ID not found: 10001", exception.getMessage());
    }
}