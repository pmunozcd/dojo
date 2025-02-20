package com.example.spring.exception;

public class BookIdMismatchException extends RuntimeException {
  public BookIdMismatchException(String message, Throwable cause) {
    super(message, cause);
  }

  public BookIdMismatchException() {
    super("Book ID mismatch");
  }
}
