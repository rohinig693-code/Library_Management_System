package com.library.library_backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.library.library_backend.entity.Book;
import com.library.library_backend.entity.Borrow;
import com.library.library_backend.entity.User;
import com.library.library_backend.repository.BookRepository;
import com.library.library_backend.repository.BorrowRepository;
import com.library.library_backend.repository.UserRepository;

@Service
public class BorrowService {

    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public BorrowService(
            BorrowRepository borrowRepository,
            UserRepository userRepository,
            BookRepository bookRepository) {

        this.borrowRepository = borrowRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    // BORROW BOOK
    public Borrow borrowBook(Long userId, Long bookId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));

        if (book.getAvailableQuantity() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        Borrow borrow = new Borrow();

        borrow.setUser(user);
        borrow.setBook(book);
        borrow.setBorrowedDate(LocalDate.now());
        borrow.setStatus("BORROWED");

        book.setAvailableQuantity(
                book.getAvailableQuantity() - 1);

        bookRepository.save(book);

        return borrowRepository.save(borrow);
    }

    // GET USER BORROWED BOOKS
    public List<Borrow> getUserBorrows(Long userId) {

        return borrowRepository.findByUserId(userId);
    }

    // RETURN BOOK
    public Borrow returnBook(Long borrowId) {

        Borrow borrow = borrowRepository.findById(borrowId)
                .orElseThrow(() ->
                        new RuntimeException("Borrow record not found"));

        if ("RETURNED".equalsIgnoreCase(borrow.getStatus())) {
            throw new RuntimeException(
                    "Book has already been returned");
        }

        Book book = borrow.getBook();

        book.setAvailableQuantity(
                book.getAvailableQuantity() + 1);

        bookRepository.save(book);

        borrow.setStatus("RETURNED");

        return borrowRepository.save(borrow);
    }
}