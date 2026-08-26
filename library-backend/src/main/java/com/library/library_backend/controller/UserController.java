package com.library.library_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.library_backend.entity.User;
import com.library.library_backend.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;


    public UserController(UserRepository userRepository) {

        this.userRepository = userRepository;

    }


    @GetMapping("/users")
    public List<User> getUsers() {

        return userRepository.findAll();

    }

}