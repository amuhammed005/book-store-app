import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseURL from "../../../utils/baseURL.js";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseURL()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set(`Authorization`, `Bearer ${token}`);
    }
    return Headers;
  },
});

// Define a service using a base URL and expected endpoints
const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({ 
    fetchAllBooks: builder.query({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const result = await baseQuery("/");

        if (!result.error) {
          const books = Array.isArray(result.data) ? result.data : result.data.books;
          return { data: { books, source: result.data.source || "database" } };
        }

        try {
          const response = await fetch("/books.json");
          if (!response.ok) throw new Error("Fallback catalogue could not be loaded");
          const books = await response.json();
          return { data: { books, source: "fallback" } };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: ["Books"],
    }),
    fetchBookById: builder.query({
      async queryFn(id, _api, _extraOptions, baseQuery) {
        const result = await baseQuery(`/${id}`);
        if (!result.error) return { data: result.data };

        try {
          const response = await fetch("/books.json");
          const books = await response.json();
          const book = books.find((item) => String(item._id) === String(id));
          return book
            ? { data: book }
            : { error: { status: 404, error: "Book not found" } };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: error.message } };
        }
      },
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/create-book",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Books"],
      headers: {
        "content-type": "application/json",
      },
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

export default booksApi;
