package com.springbootcourse.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootcourse.model.Course;
import com.springbootcourse.service.CourseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Unit test class for course controller
 */

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = CourseController.class)
class CourseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CourseService courseService;

    //object <-> json
    private static final ObjectMapper om = new ObjectMapper();


    Course mockCourse = new Course(10001L, "NodeJS", "coder", "TestJava10001");
    String mockCourseJson = "{\"id\":10001,\"courseName\":\"NodeJS\",\"instructorName\":\"coder\",\"description\":\"TestJava10001\"}";
    @Test
    void createCourse() {
    }

    @Test
    void getAllCourses() {
    }

    @Test
    void getCourse() throws Exception {
        Mockito.when(courseService.getCourse
                (10001L, "coder")).thenReturn
                (mockCourse);

        RequestBuilder request = MockMvcRequestBuilders.
                get("/instructors/coder/courses/10001").accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(request).andReturn();

        JSONAssert.assertEquals(mockCourseJson,
                result.getResponse().getContentAsString(), false);
    }

    @Test
    void updateCourse() {
    }

    @Test
    void deleteCourse() {
    }
}