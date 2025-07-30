type BookStatus = "reading" | "completed" | "not_started" | "dropped" | "on_hold" | "unknown";

type Author = {
  id: string;
  name: string;
};

type Genre = {
  id: string;
  name: string;
};

type Book = {
  id: string;
  title: string;
  authorId: string;
  genreId: string;
  rating: number | null;
  status: BookStatus;
  dateAdded: string;
};

type BookExtended = Book & {
  author: Author;
  genre: Genre;
};

export type { Book, BookExtended, Author, Genre, BookStatus };
