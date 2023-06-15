package com.note.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200", "http://127.0.0.1:3000", "http://127.0.0.1:4200"})
@RestController
public class LogoutRedirectController implements ErrorController {
    @RequestMapping(value = "/error")
    public void error(HttpServletResponse response) throws IOException {
        final String postLogoutPath = "http://127.0.0.1:3000/logout";
        try {
            response.sendRedirect(postLogoutPath);   //provide your error page url or home url
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
