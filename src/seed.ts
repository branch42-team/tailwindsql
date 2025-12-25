/**
 * SQL Lens Database Seeder
 *
 * Creates and populates educational datasets for learning SQL:
 * - Blog dataset: users, posts, comments
 * - Shop dataset: customers, products, orders, order_items
 * - Movies dataset: movies, actors, movie_actors, reviews
 *
 * Run with: npm run seed
 */

import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "tailwindsql.db");
const db = new Database(dbPath);

console.log("🔍 SQL Lens Database Seeder");
console.log("================================\n");

// Enable WAL mode
db.pragma("journal_mode = WAL");

// Drop existing tables
console.log("🗑️  Dropping existing tables...");
db.exec(`
  DROP TABLE IF EXISTS comments;
  DROP TABLE IF EXISTS posts;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS order_items;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS customers;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS movie_actors;
  DROP TABLE IF EXISTS actors;
  DROP TABLE IF EXISTS movies;
`);

// Create tables
console.log("📦 Creating tables...");

db.exec(`
  -- Blog Dataset
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('admin', 'author', 'reader')),
    bio TEXT,
    joined_date DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    author_id INTEGER NOT NULL,
    category TEXT CHECK(category IN ('tutorial', 'news', 'review', 'opinion')),
    published INTEGER DEFAULT 0 CHECK(published IN (0, 1)),
    views INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
  );

  CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Shop Dataset
  CREATE TABLE customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL,
    signup_date DATE DEFAULT CURRENT_DATE
  );

  CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('electronics', 'clothing', 'books', 'home', 'sports')),
    price REAL NOT NULL CHECK(price > 0),
    stock INTEGER DEFAULT 0 CHECK(stock >= 0),
    rating REAL DEFAULT 0 CHECK(rating >= 0 AND rating <= 5)
  );

  CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'shipped', 'delivered', 'cancelled')),
    total REAL DEFAULT 0,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    price REAL NOT NULL CHECK(price > 0),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );

  -- Movies Dataset
  CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    genre TEXT NOT NULL CHECK(genre IN ('action', 'comedy', 'drama', 'scifi', 'thriller', 'romance')),
    release_year INTEGER NOT NULL,
    duration_minutes INTEGER,
    rating REAL DEFAULT 0 CHECK(rating >= 0 AND rating <= 10)
  );

  CREATE TABLE actors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    birth_year INTEGER,
    nationality TEXT
  );

  CREATE TABLE movie_actors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    actor_id INTEGER NOT NULL,
    role TEXT,
    is_lead INTEGER DEFAULT 0 CHECK(is_lead IN (0, 1)),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    FOREIGN KEY (actor_id) REFERENCES actors(id)
  );

  CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie_id INTEGER NOT NULL,
    reviewer_name TEXT NOT NULL,
    rating REAL NOT NULL CHECK(rating >= 0 AND rating <= 10),
    comment TEXT,
    review_date DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
  );
`);

// Data generators for educational datasets
const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Iris", "Jack", "Kate", "Leo", "Maya", "Noah", "Olivia", "Peter", "Quinn", "Ruby", "Sam", "Tina"];

const lastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Davis",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Lewis",
  "Lee",
  "Walker",
];

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Seattle", "Denver", "Boston", "Portland"];

const countries = ["USA", "Canada", "UK", "Germany", "France", "Spain", "Italy", "Australia", "Japan", "Brazil"];

const postCategories = ["tutorial", "news", "review", "opinion"];
const postTitles = {
  tutorial: ["Getting Started with SQL", "Advanced JOIN Techniques", "Database Optimization Tips", "Understanding Indexes"],
  news: ["New Database Features Released", "SQL Standard Updates", "Open Source Database News", "Cloud Database Trends"],
  review: ["Comparing Database Systems", "Best SQL Tools of 2024", "Database Performance Analysis", "SQL Editor Review"],
  opinion: ["Why SQL Still Matters", "The Future of Databases", "SQL vs NoSQL Debate", "Database Design Philosophy"],
};

const movieTitles = [
  "The Matrix",
  "Inception",
  "Interstellar",
  "The Shawshank Redemption",
  "Pulp Fiction",
  "The Dark Knight",
  "Forrest Gump",
  "Fight Club",
  "The Godfather",
  "Goodfellas",
  "The Departed",
  "The Prestige",
  "Memento",
  "Gladiator",
  "The Social Network",
];

const actorNames = [
  "Tom Hanks",
  "Leonardo DiCaprio",
  "Morgan Freeman",
  "Brad Pitt",
  "Christian Bale",
  "Matt Damon",
  "Al Pacino",
  "Robert De Niro",
  "Johnny Depp",
  "Keanu Reeves",
  "Scarlett Johansson",
  "Jennifer Lawrence",
  "Natalie Portman",
  "Meryl Streep",
  "Cate Blanchett",
  "Emma Stone",
  "Anne Hathaway",
  "Jessica Chastain",
  "Amy Adams",
  "Sandra Bullock",
];

const genres = ["action", "comedy", "drama", "scifi", "thriller", "romance"];

const productNames = {
  electronics: ["Laptop Pro", "Wireless Mouse", "USB Keyboard", 'Monitor 27"', "Bluetooth Speaker", "Webcam HD"],
  clothing: ["T-Shirt", "Jeans", "Jacket", "Sneakers", "Dress", "Hoodie"],
  books: ["SQL Mastery", "Python Guide", "Web Development 101", "Data Science Basics", "Algorithm Design"],
  home: ["Coffee Maker", "Desk Lamp", "Office Chair", "Table Desk", "Bookshelf"],
  sports: ["Yoga Mat", "Dumbbells", "Running Shoes", "Tennis Racket", "Basketball"],
};

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min: number, max: number, decimals: number = 2): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function randomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

// ========================================
// BLOG DATASET
// ========================================
console.log("\n📝 Blog Dataset");
console.log("-------------------");

// Seed users (50 records)
console.log("👥 Seeding users...");
const insertUser = db.prepare(`
  INSERT INTO users (name, email, role, bio) VALUES (?, ?, ?, ?)
`);

const roles = ["admin", "author", "reader"];
const usedEmails = new Set<string>();

const insertUsers = db.transaction(() => {
  for (let i = 0; i < 50; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const name = `${firstName} ${lastName}`;

    let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@blog.com`;
    let counter = 1;
    while (usedEmails.has(email)) {
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${counter}@blog.com`;
      counter++;
    }
    usedEmails.add(email);

    const role = i < 2 ? "admin" : i < 15 ? "author" : "reader";
    const bio = `${name} is a ${role} who loves technology and writing.`;

    insertUser.run(name, email, role, bio);
  }
});
insertUsers();

// Seed posts (100 records)
console.log("📄 Seeding posts...");
const insertPost = db.prepare(`
  INSERT INTO posts (title, content, author_id, category, published, views, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertPosts = db.transaction(() => {
  for (let i = 0; i < 100; i++) {
    const category = randomFrom(postCategories);
    const title = randomFrom(postTitles[category as keyof typeof postTitles]);
    const content = `This is a comprehensive article about ${title.toLowerCase()}. It covers important concepts and practical examples that will help you master this topic.`;
    const authorId = randomInt(1, 15); // Only authors create posts
    const published = Math.random() > 0.2 ? 1 : 0;
    const views = published ? randomInt(10, 5000) : 0;
    const createdAt = randomDate(new Date(2023, 0, 1), new Date());

    insertPost.run(title, content, authorId, category, published, views, createdAt);
  }
});
insertPosts();

// Seed comments (200 records)
console.log("💬 Seeding comments...");
const insertComment = db.prepare(`
  INSERT INTO comments (post_id, user_id, content, likes, created_at) VALUES (?, ?, ?, ?, ?)
`);

const commentTexts = [
  "Great article! Very helpful.",
  "Thanks for sharing this.",
  "I learned a lot from this post.",
  "Could you explain more about this topic?",
  "Excellent explanation!",
  "This is exactly what I was looking for.",
  "Very informative, thank you!",
  "I have a question about this...",
  "Well written and easy to understand.",
  "Looking forward to more posts like this.",
];

const insertComments = db.transaction(() => {
  for (let i = 0; i < 200; i++) {
    const postId = randomInt(1, 100);
    const userId = randomInt(1, 50);
    const content = randomFrom(commentTexts);
    const likes = randomInt(0, 50);
    const createdAt = randomDate(new Date(2023, 6, 1), new Date());

    insertComment.run(postId, userId, content, likes, createdAt);
  }
});
insertComments();

// ========================================
// SHOP DATASET
// ========================================
console.log("\n🛍️  Shop Dataset");
console.log("-------------------");

// Seed customers (80 records)
console.log("👤 Seeding customers...");
const insertCustomer = db.prepare(`
  INSERT INTO customers (name, email, city, country, signup_date) VALUES (?, ?, ?, ?, ?)
`);

const usedCustomerEmails = new Set<string>();

const insertCustomers = db.transaction(() => {
  for (let i = 0; i < 80; i++) {
    const firstName = randomFrom(firstNames);
    const lastName = randomFrom(lastNames);
    const name = `${firstName} ${lastName}`;

    let email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@shop.com`;
    let counter = 1;
    while (usedCustomerEmails.has(email)) {
      email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${counter}@shop.com`;
      counter++;
    }
    usedCustomerEmails.add(email);

    const city = randomFrom(cities);
    const country = randomFrom(countries);
    const signupDate = randomDate(new Date(2022, 0, 1), new Date());

    insertCustomer.run(name, email, city, country, signupDate);
  }
});
insertCustomers();

// Seed products (60 records)
console.log("📦 Seeding products...");
const insertProduct = db.prepare(`
  INSERT INTO products (name, category, price, stock, rating) VALUES (?, ?, ?, ?, ?)
`);

const productCategories = ["electronics", "clothing", "books", "home", "sports"];

let productCount = 0;
const insertProducts = db.transaction(() => {
  for (const category of productCategories) {
    const items = productNames[category as keyof typeof productNames];
    for (const item of items) {
      const price = randomFloat(9.99, 299.99);
      const stock = randomInt(0, 100);
      const rating = randomFloat(3.0, 5.0, 1);

      insertProduct.run(item, category, price, stock, rating);
      productCount++;
    }
  }
});
insertProducts();

// Seed orders (150 records)
console.log("📋 Seeding orders...");
const insertOrder = db.prepare(`
  INSERT INTO orders (customer_id, order_date, status, total) VALUES (?, ?, ?, ?)
`);

const orderStatuses = ["pending", "shipped", "delivered", "cancelled"];

const insertOrders = db.transaction(() => {
  for (let i = 0; i < 150; i++) {
    const customerId = randomInt(1, 80);
    const orderDate = randomDate(new Date(2023, 0, 1), new Date());
    const status = randomFrom(orderStatuses);
    const total = randomFloat(20, 500);

    insertOrder.run(customerId, orderDate, status, total);
  }
});
insertOrders();

// Seed order items (300 records)
console.log("🛒 Seeding order items...");
const insertOrderItem = db.prepare(`
  INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)
`);

const insertOrderItems = db.transaction(() => {
  for (let i = 1; i <= 150; i++) {
    // Each order has 1-3 items
    const numItems = randomInt(1, 3);
    for (let j = 0; j < numItems; j++) {
      const productId = randomInt(1, productCount);
      const quantity = randomInt(1, 5);
      const price = randomFloat(9.99, 299.99);

      insertOrderItem.run(i, productId, quantity, price);
    }
  }
});
insertOrderItems();

// ========================================
// MOVIES DATASET
// ========================================
console.log("\n🎬 Movies Dataset");
console.log("-------------------");

// Seed movies (30 records)
console.log("🎥 Seeding movies...");
const insertMovie = db.prepare(`
  INSERT INTO movies (title, genre, release_year, duration_minutes, rating) VALUES (?, ?, ?, ?, ?)
`);

let movieCountActual = 0;
const insertMovies = db.transaction(() => {
  for (let i = 0; i < Math.min(30, movieTitles.length); i++) {
    const title = movieTitles[i];
    const genre = randomFrom(genres);
    const releaseYear = randomInt(1990, 2024);
    const durationMinutes = randomInt(90, 180);
    const rating = randomFloat(6.0, 9.5, 1);

    insertMovie.run(title, genre, releaseYear, durationMinutes, rating);
    movieCountActual++;
  }
});
insertMovies();

// Seed actors (20 records)
console.log("⭐ Seeding actors...");
const insertActor = db.prepare(`
  INSERT INTO actors (name, birth_year, nationality) VALUES (?, ?, ?)
`);

const nationalities = ["American", "British", "Canadian", "Australian", "French", "German", "Italian"];

let actorCountActual = 0;
const insertActors = db.transaction(() => {
  for (const actor of actorNames) {
    const birthYear = randomInt(1950, 1990);
    const nationality = randomFrom(nationalities);

    insertActor.run(actor, birthYear, nationality);
    actorCountActual++;
  }
});
insertActors();

// Seed movie_actors (80 records)
console.log("🎭 Seeding movie_actors...");
const insertMovieActor = db.prepare(`
  INSERT INTO movie_actors (movie_id, actor_id, role, is_lead) VALUES (?, ?, ?, ?)
`);

const characterRoles = ["Protagonist", "Antagonist", "Supporting", "Mentor", "Love Interest", "Sidekick"];

const insertMovieActors = db.transaction(() => {
  for (let movieId = 1; movieId <= movieCountActual; movieId++) {
    // Each movie has 2-4 actors
    const numActors = Math.min(randomInt(2, 4), actorCountActual);
    const usedActors = new Set<number>();

    for (let i = 0; i < numActors; i++) {
      let actorId = randomInt(1, actorCountActual);
      while (usedActors.has(actorId)) {
        actorId = randomInt(1, actorCountActual);
      }
      usedActors.add(actorId);

      const role = randomFrom(characterRoles);
      const isLead = i === 0 ? 1 : 0; // First actor is lead

      insertMovieActor.run(movieId, actorId, role, isLead);
    }
  }
});
insertMovieActors();

// Seed reviews (100 records)
console.log("💭 Seeding reviews...");
const insertReview = db.prepare(`
  INSERT INTO reviews (movie_id, reviewer_name, rating, comment, review_date) VALUES (?, ?, ?, ?, ?)
`);

const reviewComments = [
  "Amazing movie! Highly recommended.",
  "Great performances by all actors.",
  "The plot was engaging and well-paced.",
  "Excellent cinematography and direction.",
  "A must-watch masterpiece.",
  "Good but could have been better.",
  "The ending was unexpected and satisfying.",
  "Brilliant storytelling and character development.",
];

const insertReviews = db.transaction(() => {
  for (let i = 0; i < 100; i++) {
    const movieId = randomInt(1, movieCountActual);
    const reviewerName = `${randomFrom(firstNames)} ${randomFrom(lastNames)}`;
    const rating = randomFloat(5.0, 10.0, 1);
    const comment = randomFrom(reviewComments);
    const reviewDate = randomDate(new Date(2020, 0, 1), new Date());

    insertReview.run(movieId, reviewerName, rating, comment, reviewDate);
  }
});
insertReviews();

// Print summary
console.log("\n✅ Database seeded successfully!\n");

console.log("📊 Summary:");
console.log("\nBlog Dataset:");
console.log(`   - Users: ${(db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number }).count}`);
console.log(`   - Posts: ${(db.prepare("SELECT COUNT(*) as count FROM posts").get() as { count: number }).count}`);
console.log(`   - Comments: ${(db.prepare("SELECT COUNT(*) as count FROM comments").get() as { count: number }).count}`);

console.log("\nShop Dataset:");
console.log(`   - Customers: ${(db.prepare("SELECT COUNT(*) as count FROM customers").get() as { count: number }).count}`);
console.log(`   - Products: ${(db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number }).count}`);
console.log(`   - Orders: ${(db.prepare("SELECT COUNT(*) as count FROM orders").get() as { count: number }).count}`);
console.log(`   - Order Items: ${(db.prepare("SELECT COUNT(*) as count FROM order_items").get() as { count: number }).count}`);

console.log("\nMovies Dataset:");
console.log(`   - Movies: ${(db.prepare("SELECT COUNT(*) as count FROM movies").get() as { count: number }).count}`);
console.log(`   - Actors: ${(db.prepare("SELECT COUNT(*) as count FROM actors").get() as { count: number }).count}`);
console.log(`   - Movie Actors: ${(db.prepare("SELECT COUNT(*) as count FROM movie_actors").get() as { count: number }).count}`);
console.log(`   - Reviews: ${(db.prepare("SELECT COUNT(*) as count FROM reviews").get() as { count: number }).count}`);

console.log("\n🔍 Ready to learn SQL with SQL Lens!\n");

db.close();
