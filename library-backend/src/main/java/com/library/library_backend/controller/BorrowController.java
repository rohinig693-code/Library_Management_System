package com.library.library_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.library.library_backend.entity.Borrow;
import com.library.library_backend.service.BorrowService;

@RestController
@RequestMapping("/borrow")
@CrossOrigin(origins = "*")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping("/{userId}/{bookId}")
    public Borrow borrowBook(
            @PathVariable Long userId,
            @PathVariable Long bookId) {

        return borrowService.borrowBook(userId, bookId);
    }

    @GetMapping("/user/{userId}")
    public List<Borrow> getUserBorrows(
            @PathVariable Long userId) {

        return borrowService.getUserBorrows(userId);
    }

    @PutMapping("/return/{borrowId}")
    public Borrow returnBook(
            @PathVariable Long borrowId) {

        return borrowService.returnBook(borrowId);
    }
}