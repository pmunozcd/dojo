import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Book } from '../../models/book';
import { BooksService } from '../../services/books.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {

  books: Book[] = [];
  book: Book = { id: 0, title: '', author: '' };
  searchTitle = '';

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.getAllBooks();
  }

  cleanGlobals(): void {
    this.getAllBooks();
    this.book = { id: 0, title: '', author: '' };
  }

  getAllBooks(): void {
    this.booksService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
    })
  }

  searchBooksByTitle() {
    if (this.searchTitle.trim()) {
      this.booksService
        .getBooksByTitle(this.searchTitle)
        .subscribe((data: Book[]) => {
          this.books = data;
        })
    } else {
      this.getAllBooks();
    }
  }

  addBook() {
    if (this.book.title && this.book.author) {
      this.booksService.addBook(this.book).subscribe(() => {
        this.cleanGlobals()
      })
    }
  }

  updateBook() {
    if (this.book.id && this.book.title && this.book.author) {
      this.booksService.updateBook(this.book).subscribe(() => {
        this.cleanGlobals()
      })
    }
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id).subscribe(() => {
      this.getAllBooks()
    })
  }

  editBook(book: Book) {
    this.book = { ...book };
  }
}
