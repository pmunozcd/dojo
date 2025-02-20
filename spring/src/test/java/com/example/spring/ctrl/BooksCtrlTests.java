package com.example.spring.ctrl;

import com.example.spring.entity.Book;
import com.example.spring.exception.BookIdMismatchException;
import com.example.spring.exception.BookNotFoundException;
import com.example.spring.repository.BooksRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BooksCtrlTest {

  @Mock
  private BooksRepository booksRepository;

  @InjectMocks
  private BooksCtrl booksCtrl;

  @BeforeEach
  void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  void findAllReturnsAllBooks() {
    when(booksRepository.findAll()).thenReturn(Collections.singletonList(new Book()));
    Iterable<Book> books = booksCtrl.findAll();
    assertNotNull(books);
    verify(booksRepository, times(1)).findAll();
  }

  @Test
  void findByTitleReturnsBooksWithGivenTitle() {
    String title = "Test Title";
    when(booksRepository.findByTitle(title)).thenReturn(Collections.singletonList(new Book()));
    List<Book> books = booksCtrl.findByTitle(title);
    assertNotNull(books);
    verify(booksRepository, times(1)).findByTitle(title);
  }

  @Test
  void findOneReturnsBookWhenIdExists() {
    Long id = 1L;
    when(booksRepository.findById(id)).thenReturn(Optional.of(new Book()));
    Book book = booksCtrl.findOne(id);
    assertNotNull(book);
    verify(booksRepository, times(1)).findById(id);
  }

  @Test
  void findOneThrowsExceptionWhenIdDoesNotExist() {
    Long id = 1L;
    when(booksRepository.findById(id)).thenReturn(Optional.empty());
    assertThrows(BookNotFoundException.class, () -> booksCtrl.findOne(id));
    verify(booksRepository, times(1)).findById(id);
  }

  @Test
  void createSavesAndReturnsBook() {
    Book book = new Book();
    when(booksRepository.save(book)).thenReturn(book);
    Book createdBook = booksCtrl.create(book);
    assertNotNull(createdBook);
    verify(booksRepository, times(1)).save(book);
  }

  @Test
  void deleteRemovesBookWhenIdExists() {
    Long id = 1L;
    when(booksRepository.findById(id)).thenReturn(Optional.of(new Book()));
    booksCtrl.delete(id);
    verify(booksRepository, times(1)).findById(id);
    verify(booksRepository, times(1)).deleteById(id);
  }

  @Test
  void deleteThrowsExceptionWhenIdDoesNotExist() {
    Long id = 1L;
    when(booksRepository.findById(id)).thenReturn(Optional.empty());
    assertThrows(BookNotFoundException.class, () -> booksCtrl.delete(id));
    verify(booksRepository, times(1)).findById(id);
  }

  @Test
  void updateBookSavesAndReturnsUpdatedBookWhenIdMatches() {
    Long id = 1L;
    Book book = new Book();
    book.setId(id);
    when(booksRepository.findById(id)).thenReturn(Optional.of(book));
    when(booksRepository.save(book)).thenReturn(book);
    Book updatedBook = booksCtrl.update(book, id);
    assertNotNull(updatedBook);
    verify(booksRepository, times(1)).findById(id);
    verify(booksRepository, times(1)).save(book);
  }

  @Test
  void updateBookThrowsExceptionWhenIdDoesNotMatch() {
    Long id = 1L;
    Book book = new Book();
    book.setId(2L);
    assertThrows(BookIdMismatchException.class, () -> booksCtrl.update(book, id));
  }

  @Test
  void updateBookThrowsExceptionWhenIdDoesNotExist() {
    Long id = 1L;
    Book book = new Book();
    book.setId(id);
    when(booksRepository.findById(id)).thenReturn(Optional.empty());
    assertThrows(BookNotFoundException.class, () -> booksCtrl.update(book, id));
    verify(booksRepository, times(1)).findById(id);
  }
}
