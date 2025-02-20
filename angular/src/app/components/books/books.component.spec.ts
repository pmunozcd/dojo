import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import { BooksService } from '../../services/books.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Book } from '../../models/book';
import jasmine from 'jasmine';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let booksService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        BooksService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);

    // Initialize spies
    spyOn(booksService, 'getBooks').and.returnValue(of([]));
    spyOn(booksService, 'getBooksByTitle').and.returnValue(of([]));
    spyOn(booksService, 'addBook').and.returnValue(of({ id: 0, title: "", author: "" }));
    spyOn(booksService, 'updateBook').and.returnValue(of({ id: 0, title: "", author: "" }));
    spyOn(booksService, 'deleteBook').and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize books on ngOnInit', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' }
    ];
    (booksService.getBooks as jasmine.Spy).and.returnValue(of(mockBooks));

    component.ngOnInit();
    expect(component.books).toEqual(mockBooks);
  });

  it('should clean globals and reload books on cleanGlobals', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' }
    ];
    (booksService.getBooks as jasmine.Spy).and.returnValue(of(mockBooks));

    component.cleanGlobals();
    expect(component.books).toEqual(mockBooks);
    expect(component.book).toEqual({ id: 0, title: '', author: '' });
  });

  it('should search books by title if searchTitle is not empty', () => {
    const mockBooksByTitle: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' }
    ];
    component.searchTitle = 'Book One';
    (booksService.getBooksByTitle as jasmine.Spy).and.returnValue(of(mockBooksByTitle));

    component.searchBooksByTitle();
    expect(component.books).toEqual(mockBooksByTitle);
  });

  it('should reload all books if searchTitle is empty', () => {
    const mockBooks: Book[] = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' }
    ];
    component.searchTitle = '';
    (booksService.getBooks as jasmine.Spy).and.returnValue(of(mockBooks));

    component.searchBooksByTitle();
    expect(component.books).toEqual(mockBooks);
  });

  it('should add a book if title and author are provided', () => {
    const newBook: Book = { id: 3, title: 'New Book', author: 'New Author' };
    (booksService.addBook as jasmine.Spy).and.returnValue(of({}));

    component.book = { ...newBook };
    component.addBook();
    expect(booksService.addBook).toHaveBeenCalledWith(newBook);
  });

  it('should update a book if id, title and author are provided', () => {
    const updatedBook: Book = { id: 1, title: 'Updated Book', author: 'Updated Author' };
    (booksService.updateBook as jasmine.Spy).and.returnValue(of({}));

    component.book = { ...updatedBook };
    component.updateBook();
    expect(booksService.updateBook).toHaveBeenCalledWith(updatedBook);
  });

  it('should delete a book and reload books', () => {
    const bookId = 1;
    (booksService.deleteBook as jasmine.Spy).and.returnValue(of({}));
    spyOn(component, 'getAllBooks');

    component.deleteBook(bookId);
    expect(booksService.deleteBook).toHaveBeenCalledWith(bookId);
    expect(component.getAllBooks).toHaveBeenCalled();
  });

  it('should set the book to be edited', () => {
    const bookToEdit: Book = { id: 1, title: 'Test Book', author: 'Test Author' };

    component.editBook(bookToEdit);
    expect(component.book).toEqual(bookToEdit);
  });
});
