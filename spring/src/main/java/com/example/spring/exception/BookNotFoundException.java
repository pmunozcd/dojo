package com.example.spring.exception;

public class BookNotFoundException extends RuntimeException {
  public BookNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public BookNotFoundException() {
    super("Book not found");
  }
}
