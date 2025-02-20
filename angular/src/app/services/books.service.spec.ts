import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Book } from '../models/book';

describe('BooksService', () => {
  let service: BooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no outstanding requests are remaining after each test
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return an Observable<Book[]>', () => {
      const mockBooks: Book[] = [
        { id: 1, title: 'Book One', author: 'Author One' },
        { id: 2, title: 'Book Two', author: 'Author Two' }
      ];

      service.getBooks().subscribe(books => {
        expect(books.length).toBe(2);
        expect(books).toEqual(mockBooks);
      });

      const req = httpMock.expectOne('http://localhost:9000/books');
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('should return an Observable<Book> for a given ID', () => {
      const mockBook: Book = { id: 1, title: 'Book One', author: 'Author One' };

      service.getBookById(1).subscribe(book => {
        expect(book.id).toBe(1);
        expect(book).toEqual(mockBook);
      });

      const req = httpMock.expectOne('http://localhost:9000/books/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockBook);
    });
  });

  describe('getBooksByTitle', () => {
    it('should return an Observable<Book[]> for a given title', () => {
      const mockBooks: Book[] = [
        { id: 1, title: 'Book One', author: 'Author One' },
        { id: 2, title: 'Book One Part Two', author: 'Author Two' }
      ];

      service.getBooksByTitle('Book One').subscribe(books => {
        expect(books.length).toBe(2);
        expect(books).toEqual(mockBooks);
      });

      const req = httpMock.expectOne('http://localhost:9000/books/title/Book One');
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);
    });
  });

  describe('addBook', () => {
    it('should add a new book and return an Observable<Book>', () => {
      const mockBook: Book = { id: 3, title: 'New Book', author: 'New Author' };

      service.addBook(mockBook).subscribe(book => {
        expect(book.id).toBe(3);
        expect(book).toEqual(mockBook);
      });

      const req = httpMock.expectOne('http://localhost:9000/books');
      expect(req.request.method).toBe('POST');
      req.flush(mockBook);
    });
  });

  describe('updateBook', () => {
    it('should update a book and return an Observable<Book>', () => {
      const mockBook: Book = { id: 1, title: 'Updated Book One', author: 'Author One' };

      service.updateBook(mockBook).subscribe(book => {
        expect(book.id).toBe(1);
        expect(book).toEqual(mockBook);
      });

      const req = httpMock.expectOne('http://localhost:9000/books/1');
      expect(req.request.method).toBe('PUT');
      req.flush(mockBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book and return an Observable<void>', () => {
      service.deleteBook(1).subscribe(() => { });

      const req = httpMock.expectOne('http://localhost:9000/books/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
