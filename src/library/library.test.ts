import { beforeEach, describe, expect, test } from "vitest";
import { Library } from "./library";

describe("Given a library", () => {
  let library: Library;
  beforeEach(() => {
    library = new Library();
  });

  describe("When a book is added", () => {
    test("Then the book added should be in the library's books", () => {
      const mockBook = {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
      };

      library.addBook(mockBook);

      const books = library.getAllBooks();
      expect(books[0]).toBe(mockBook);
    });
  });

  describe("When a book is requested by title", () => {
    describe("and the library has books", () => {
      test("and the book requested exists in the library, Then the book should be returned", () => {
        library.addBook({
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
        });

        const book = library.getBookByTitle("The Hobbit");

        expect(book.title).toBe("The Hobbit");
      });

      test("and it does not exist in the library, Then an error should be thrown", () => {
        library.addBook({
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
        });

        expect(() => {
          library.getBookByTitle("not found");
        }).toThrow("Book not found");
      });
    });

    describe("and the library is empty", () => {
      test("Then an error should be thrown", () => {
        expect(() => {
          library.getBookByTitle("The Hobbit");
        }).toThrow("The library is empty");
      });
    });
  });
});
