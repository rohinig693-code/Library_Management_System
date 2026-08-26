package com.library.library_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.library_backend.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}