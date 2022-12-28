import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {IBook} from "../../interfaces/book";

@Component({
  selector: 'app-secure-page',
  templateUrl: './secure-page.component.html',
  styleUrls: ['./secure-page.component.scss']
})
export class SecurePageComponent implements OnInit {

  public books: IBook[] = [];

  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  public addBooks(): void {
    this.bookService.generateBooks(10).subscribe(_ => {
      this.loadBooks();
    })
  }

  public deleteBooks(): void {
    this.bookService.deleteBooks().subscribe(_ => {
      this.loadBooks();
    })
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe(result => {
      this.books = result;
    })
  }
}
