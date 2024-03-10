type Book = { title: string; author: string };

export class Library {
  #books: Book[] = [];

  addBook(book: Book) {
    this.#books.push(book);
  }

  getAllBooks() {
    return this.#books;
  }

  getBookByTitle(title: string) {
    if (this.#books.length === 0) {
      throw new Error("The library is empty");
    }

    const foundBook = this.#books.find((book) => book.title === title);

    if (foundBook === null) {
      throw new Error("Error finding book");
    }

    if (foundBook === undefined) {
      throw new Error("Book not found");
    }

    return foundBook;
  }
}
