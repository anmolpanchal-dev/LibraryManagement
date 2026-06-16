import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getBooks = () => API.get("/books");

export const addBook = (bookData) =>
  API.post("/books", bookData);

export const updateBook = (id, bookData) =>
  API.put(`/books/${id}`, bookData);

export const deleteBook = (id) =>
  API.delete(`/books/${id}`);