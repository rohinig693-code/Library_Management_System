package com.library.library_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.library.library_backend.entity.Borrow;

public interface BorrowRepository extends JpaRepository<Borrow, Long> {

    List<Borrow> findByUserId(Long userId);
}