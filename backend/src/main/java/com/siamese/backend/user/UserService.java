package com.siamese.backend.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User findOrCreateByClerkUserId(String clerkUserId) {
        return userRepository
                .findByClerkUserId(clerkUserId)
                .orElseGet(() ->
                        userRepository.save(new User(clerkUserId))
                );
    }
}