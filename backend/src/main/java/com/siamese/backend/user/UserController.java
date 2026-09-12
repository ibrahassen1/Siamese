package com.siamese.backend.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(
            @AuthenticationPrincipal Jwt jwt
    ) {
        String clerkUserId = jwt.getSubject();

        User user =
                userService.findOrCreateByClerkUserId(clerkUserId);

        return new UserResponse(
                user.getId(),
                user.getClerkUserId()
        );
    }

    public record UserResponse(
            UUID id,
            String clerkUserId
    ) {}
}