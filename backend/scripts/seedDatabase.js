import dotenv from "dotenv";
import mongoose from "mongoose";
import Book from "../model/books/book.model.js";
import Order from "../model/orders/order.model.js";
import fallbackBooks from "../data/fallbackBooks.js";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required to seed the database.");
}

const demoEmail = process.env.DEMO_ORDER_EMAIL || "codewarrior33@gmail.com";

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });

  await Book.bulkWrite(
    fallbackBooks.map(({ _id, ...book }) => ({
      updateOne: { filter: { title: book.title }, update: { $set: book }, upsert: true },
    })),
  );

  const books = await Book.find({ title: { $in: fallbackBooks.map((book) => book.title) } });
  const existingDemoOrders = await Order.countDocuments({ email: demoEmail, isDemo: true });

  if (existingDemoOrders === 0 && books.length >= 6) {
    const createDemoOrder = (bookSlice, totalPrice, daysAgo) => ({
      name: "Bookstore Demo Customer",
      email: demoEmail,
      phone: 233200000000,
      address: { city: "Accra", country: "Ghana", state: "Greater Accra", zipcode: "GA-001-0010" },
      productIds: bookSlice.map((book) => book._id),
      totalPrice,
      isDemo: true,
      createdAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
    });

    await Order.insertMany([
      createDemoOrder(books.slice(0, 2), 35.98, 45),
      createDemoOrder(books.slice(2, 4), 52.48, 21),
      createDemoOrder(books.slice(4, 6), 41.98, 7),
    ]);
  }

  console.log(`Database seeded: ${books.length} catalogue books; demo orders available for ${demoEmail}.`);
} finally {
  await mongoose.disconnect();
}
