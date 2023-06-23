package com.note.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(origins = {
        "http://127.0.0.1:3000",
        "http://localhost:3000",
        "http://127.0.0.1:4200",
        "http://localhost:4200",
        "http://127.0.0.1",
        "http://localhost"})
@RestController
public class LogoutRedirectController implements ErrorController {
    @Value("${note.postLogoutURI}")
    String postLogoutURI;
    @RequestMapping(value = "/error")
    public void error(HttpServletResponse response) throws IOException {
        //final String postLogoutPath = "http://127.0.0.1:3000/logout";
        final String postLogoutPath = postLogoutURI;
        try {
            response.sendRedirect(postLogoutPath);   //provide your error page url or home url
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
