/**
 * SQL Lens Datasets API
 * 
 * Returns information about available educational datasets.
 */

import { NextResponse } from 'next/server';
import db from '@/lib/db';

export interface Dataset {
  id: string;
  name: string;
  description: string;
  icon: string;
  tables: {
    name: string;
    rowCount: number;
    description: string;
  }[];
  sampleQueries: {
    title: string;
    sql: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
}

export async function GET() {
  try {
    // Get row counts for each table
    const getUsersCount = () => (db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }).count;
    const getPostsCount = () => (db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number }).count;
    const getCommentsCount = () => (db.prepare('SELECT COUNT(*) as count FROM comments').get() as { count: number }).count;
    const getCustomersCount = () => (db.prepare('SELECT COUNT(*) as count FROM customers').get() as { count: number }).count;
    const getProductsCount = () => (db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number }).count;
    const getOrdersCount = () => (db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number }).count;
    const getOrderItemsCount = () => (db.prepare('SELECT COUNT(*) as count FROM order_items').get() as { count: number }).count;
    const getMoviesCount = () => (db.prepare('SELECT COUNT(*) as count FROM movies').get() as { count: number }).count;
    const getActorsCount = () => (db.prepare('SELECT COUNT(*) as count FROM actors').get() as { count: number }).count;
    const getMovieActorsCount = () => (db.prepare('SELECT COUNT(*) as count FROM movie_actors').get() as { count: number }).count;
    const getReviewsCount = () => (db.prepare('SELECT COUNT(*) as count FROM reviews').get() as { count: number }).count;

    const datasets: Dataset[] = [
      {
        id: 'blog',
        name: 'Blog Platform',
        description: 'A simple blogging platform with users, posts, and comments. Perfect for learning JOINs and filtering.',
        icon: '📝',
        tables: [
          {
            name: 'users',
            rowCount: getUsersCount(),
            description: 'Blog users with roles (admin, author, reader)'
          },
          {
            name: 'posts',
            rowCount: getPostsCount(),
            description: 'Blog posts with categories and view counts'
          },
          {
            name: 'comments',
            rowCount: getCommentsCount(),
            description: 'Comments on posts with like counts'
          }
        ],
        sampleQueries: [
          {
            title: 'Get all published posts',
            sql: 'SELECT * FROM posts WHERE published = 1 LIMIT 10',
            difficulty: 'beginner'
          },
          {
            title: 'Find posts with their authors',
            sql: 'SELECT posts.title, users.name as author, posts.views FROM posts JOIN users ON posts.author_id = users.id WHERE posts.published = 1 ORDER BY posts.views DESC LIMIT 10',
            difficulty: 'intermediate'
          },
          {
            title: 'Most commented posts',
            sql: 'SELECT posts.title, COUNT(comments.id) as comment_count FROM posts LEFT JOIN comments ON posts.id = comments.post_id GROUP BY posts.id ORDER BY comment_count DESC LIMIT 10',
            difficulty: 'advanced'
          }
        ]
      },
      {
        id: 'shop',
        name: 'E-Commerce Shop',
        description: 'An online store with customers, products, orders, and order items. Great for learning aggregations and complex JOINs.',
        icon: '🛍️',
        tables: [
          {
            name: 'customers',
            rowCount: getCustomersCount(),
            description: 'Shop customers with location information'
          },
          {
            name: 'products',
            rowCount: getProductsCount(),
            description: 'Products with categories, prices, and ratings'
          },
          {
            name: 'orders',
            rowCount: getOrdersCount(),
            description: 'Customer orders with status and totals'
          },
          {
            name: 'order_items',
            rowCount: getOrderItemsCount(),
            description: 'Individual items within each order'
          }
        ],
        sampleQueries: [
          {
            title: 'List all products',
            sql: 'SELECT name, category, price FROM products ORDER BY price DESC LIMIT 10',
            difficulty: 'beginner'
          },
          {
            title: 'Customer order history',
            sql: 'SELECT customers.name, orders.order_date, orders.status, orders.total FROM customers JOIN orders ON customers.id = orders.customer_id WHERE customers.id = 1 ORDER BY orders.order_date DESC',
            difficulty: 'intermediate'
          },
          {
            title: 'Top selling products',
            sql: 'SELECT products.name, SUM(order_items.quantity) as total_sold FROM products JOIN order_items ON products.id = order_items.product_id GROUP BY products.id ORDER BY total_sold DESC LIMIT 10',
            difficulty: 'advanced'
          }
        ]
      },
      {
        id: 'movies',
        name: 'Movie Database',
        description: 'A movie database with actors, ratings, and reviews. Perfect for learning many-to-many relationships.',
        icon: '🎬',
        tables: [
          {
            name: 'movies',
            rowCount: getMoviesCount(),
            description: 'Movies with genres, release years, and ratings'
          },
          {
            name: 'actors',
            rowCount: getActorsCount(),
            description: 'Actors with birth years and nationalities'
          },
          {
            name: 'movie_actors',
            rowCount: getMovieActorsCount(),
            description: 'Junction table linking movies and actors'
          },
          {
            name: 'reviews',
            rowCount: getReviewsCount(),
            description: 'Movie reviews with ratings and comments'
          }
        ],
        sampleQueries: [
          {
            title: 'Recent movies',
            sql: 'SELECT title, genre, release_year, rating FROM movies ORDER BY release_year DESC LIMIT 10',
            difficulty: 'beginner'
          },
          {
            title: 'Movies with their cast',
            sql: 'SELECT movies.title, actors.name, movie_actors.role FROM movies JOIN movie_actors ON movies.id = movie_actors.movie_id JOIN actors ON movie_actors.actor_id = actors.id WHERE movies.id = 1',
            difficulty: 'intermediate'
          },
          {
            title: 'Highest rated movies with review counts',
            sql: 'SELECT movies.title, movies.rating, COUNT(reviews.id) as review_count, AVG(reviews.rating) as avg_review_rating FROM movies LEFT JOIN reviews ON movies.id = reviews.movie_id GROUP BY movies.id ORDER BY movies.rating DESC LIMIT 10',
            difficulty: 'advanced'
          }
        ]
      }
    ];

    return NextResponse.json({ datasets });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch datasets';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

