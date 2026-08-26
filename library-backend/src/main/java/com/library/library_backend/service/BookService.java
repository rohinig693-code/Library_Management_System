package com.library.library_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.library.library_backend.entity.Book;
import com.library.library_backend.repository.BookRepository;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // Get all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
    // Get book by ID
public Book getBookById(Long id) {
    return bookRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Book not found"));
}

    // Add a book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Update a book
    public Book updateBook(Long id, Book updatedBook) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());
        book.setIsbn(updatedBook.getIsbn());
        book.setQuantity(updatedBook.getQuantity());
        book.setAvailableQuantity(updatedBook.getAvailableQuantity());

        return bookRepository.save(book);
    }

    // Delete a book
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}