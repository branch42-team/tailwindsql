# TailwindSQL by Branch42 🎨

> Forked from [TailwindSQL](https://tailwindsql.xyz/) and rebuilt by [Branch42](https://branch42.com) to help frontend devs learn SQL with Tailwind-style classNames — plus agency-grade polish and booking.

[![Original TailwindSQL](https://img.shields.io/badge/TailwindSQL-Original-blueviolet?logo=github)](https://github.com/mmarinovic/tailwindsql)
[![Branch42](https://img.shields.io/badge/Branch42-Agency-gold)](https://branch42.com)
[![Book a Consult](https://img.shields.io/badge/Cal.com-branch42--team%2Fconsultancy-116dff)](https://cal.com/branch42-team/consultancy)

## What is this?

TailwindSQL lets you write SQL queries using Tailwind-style class names. Branch42 forked it to make the experience agency-ready: dark Branch42 theme, attribution, and a Cal.com floating button so you can book us to ship production dashboards and workflows.

```jsx
// Fetch and render a user's name
<DB className="db-users-name-where-id-1" />
// Renders: "Ada Lovelace"

// Render products as a list
<DB className="db-products-title-limit-5" as="ul" />
// Renders: <ul><li>Mechanical Keyboard</li>...</ul>

// Order by price and show as table
<DB className="db-products-orderby-price-desc" as="table" />
```

## Branch42 additions

- 🌓 Dark Branch42 palette (navy/blue/gold) and updated gradients/badges
- Added courses with examples

## Features (original + still here)

- 🎨 **Tailwind-style syntax** - Write SQL queries using familiar class names
- ⚡ **React Server Components** - Zero client-side JavaScript for queries
- 🔒 **SQLite** - Built on better-sqlite3 for fast, local database access
- 🎯 **Zero Runtime** - Queries are parsed and executed at build/render time
- 🎭 **Multiple Render Modes** - Render as text, lists, tables, or JSON

## Syntax

```
db-{table}-{column}-where-{field}-{value}-limit-{n}-orderby-{field}-{asc|desc}
```

### Examples

| Class Name                       | SQL Query                                    |
| -------------------------------- | -------------------------------------------- |
| `db-users`                       | `SELECT * FROM users`                        |
| `db-users-name`                  | `SELECT name FROM users`                     |
| `db-users-where-id-1`            | `SELECT * FROM users WHERE id = 1`           |
| `db-posts-title-limit-10`        | `SELECT title FROM posts LIMIT 10`           |
| `db-products-orderby-price-desc` | `SELECT * FROM products ORDER BY price DESC` |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone your fork
git clone <your-fork-url> tailwindsql-branch42
cd tailwindsql-branch42

# Install dependencies
npm install

# Seed the database with demo data
npm run seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo and interactive playground!

## How It Works

1. **Parser** (`src/lib/parser.ts`) - Parses class names into query configurations
2. **Query Builder** (`src/lib/query-builder.ts`) - Transforms configs into safe SQL queries
3. **DB Component** (`src/components/DB.tsx`) - React Server Component that executes queries and renders results

## Render Modes

The `as` prop controls how results are rendered:

| Value   | Description           |
| ------- | --------------------- |
| `span`  | Inline text (default) |
| `div`   | Block element         |
| `ul`    | Unordered list        |
| `ol`    | Ordered list          |
| `table` | HTML table            |
| `json`  | JSON code block       |

## Project Structure

```
tailwindsql/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Landing page
│   │   └── api/          # API routes
│   ├── components/        # React components
│   │   ├── DB.tsx        # Main DB component
│   │   ├── Example.tsx   # Example components
│   │   └── Playground.tsx # Interactive playground
│   └── lib/              # Core logic
│       ├── parser.ts     # Class name parser
│       ├── query-builder.ts # SQL query builder
│       └── db.ts         # Database connection
└── README.md
```

## Why?

- Original: explore CSS-driven database queries.
- Branch42 fork: teach SQL to frontend devs, keep the learning fun, and make it easy to book an expert team if you need production-grade delivery.

## Credits

- Original concept & code: [TailwindSQL](https://tailwindsql.xyz/) by [mmarinovic](https://github.com/mmarinovic/tailwindsql)
- Fork, theme, SEO, and Cal.com integration: [Branch42](https://branch42.com)
- Contact: `hello@branch42.com` — Book: [cal.com/branch42-team/consultancy](https://cal.com/branch42-team/consultancy)

## License

MIT - Do whatever you want with it (except deploy to production 😅)

---

Built with 💜 using Next.js, SQLite, and questionable decisions
