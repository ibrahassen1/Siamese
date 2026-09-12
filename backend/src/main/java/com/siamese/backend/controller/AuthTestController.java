package com.siamese.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthTestController {

    @GetMapping("/api/public/test")
    public String publicTest() {
        return "Public endpoint works";
    }

    @GetMapping("/api/auth/test")
    public String protectedTest(@AuthenticationPrincipal Jwt jwt) {
        return "Authenticated Clerk user: " + jwt.getSubject();
    }
}