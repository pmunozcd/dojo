package com.example.spring.ctrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring.entity.Book;
import com.example.spring.exception.BookIdMismatchException;
import com.example.spring.exception.BookNotFoundException;
import com.example.spring.repository.BooksRepository;

@RestController
@RequestMapping("/books")
public class BooksCtrl {

  @Autowired
  private BooksRepository booksRepository;

  @GetMapping
  public Iterable<Book> findAll() {
    return booksRepository.findAll();
  }

  @GetMapping("/{id}")
  public Book findOne(@PathVariable Long id) {
    return booksRepository
        .findById(id)
        .orElseThrow(BookNotFoundException::new);
  }

  @GetMapping("/title/{title}")
  public List<Book> findByTitle(@PathVariable String title) {
    return booksRepository.findByTitle(title);
  }

  @PostMapping
  public Book create(@RequestBody Book book) {
    return booksRepository.save(book);
  }

  @PutMapping("/{id}")
  public Book update(@RequestBody Book book, @PathVariable Long id) {
    if (book.getId() != id) {
      throw new BookIdMismatchException();
    }

    booksRepository
        .findById(id)
        .orElseThrow(BookNotFoundException::new);

    return booksRepository.save(book);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    booksRepository
        .findById(id)
        .orElseThrow(BookNotFoundException::new);
    booksRepository
        .deleteById(id);
  }
}
