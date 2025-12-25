# SQL Lens 🔍

An interactive educational platform that teaches SQL by showing exactly how each clause transforms your data, step-by-step.

## Features

### 🎯 Step-by-Step Query Execution
- See intermediate results after each SQL clause
- Visual breakdown of FROM, JOIN, WHERE, SELECT, GROUP BY, ORDER BY, and LIMIT
- Plain-English explanations for every step

### 📊 Live Data Preview
- Three realistic datasets: Blog, E-Commerce, and Movies
- Work with actual data, not abstract examples
- See row counts and data transformations in real-time

### 💡 Interactive Learning
- Clickable clause chips to navigate between steps
- Play/pause controls for automated stepping
- Before/after comparisons for filtering operations

### 🎓 Educational Resources
- Guided lessons from beginner to advanced
- Sample queries for each dataset
- Database schema browser with row counts

## Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Seed the database with educational datasets
npm run seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── datasets/       # Returns available datasets info
│   │   ├── execute/        # Executes SQL with step breakdown
│   │   └── schema/         # Returns database schema
│   ├── lessons/            # Lessons listing page
│   ├── playground/         # Interactive SQL playground
│   └── page.tsx            # Landing page
├── components/
│   ├── SQLPlayground.tsx   # Main playground component
│   ├── SQLEditor.tsx       # Monaco-based SQL editor
│   ├── StepVisualization.tsx # Step chips and controls
│   └── DataViewer.tsx      # Tabbed data display
├── lib/
│   ├── db.ts              # SQLite database connection
│   ├── sql-stepper.ts     # Step execution engine
│   └── parser.ts          # SQL parsing utilities
└── seed.ts                # Database seeding script
```

## Datasets

### 📝 Blog Platform
Perfect for learning JOINs and basic filtering
- **users** (50 rows): Blog users with roles
- **posts** (100 rows): Blog posts with categories
- **comments** (200 rows): Comments on posts

### 🛍️ E-Commerce Shop
Great for aggregations and complex queries
- **customers** (80 rows): Shop customers
- **products** (27 rows): Product catalog
- **orders** (150 rows): Customer orders
- **order_items** (291 rows): Order line items

### 🎬 Movie Database
Master many-to-many relationships
- **movies** (15 rows): Movies with genres and ratings
- **actors** (20 rows): Actor information
- **movie_actors** (50 rows): Junction table
- **reviews** (100 rows): Movie reviews

## How the Step Engine Works

The step execution engine (`src/lib/sql-stepper.ts`) works by:

1. **Parsing** the SQL query using `node-sql-parser` to create an AST
2. **Building** incremental queries for each clause:
   - Step 1: `SELECT * FROM table`
   - Step 2: Add JOINs if present
   - Step 3: Add WHERE clause
   - Step 4: Add SELECT projection
   - Step 5: Add ORDER BY
   - Step 6: Add LIMIT
3. **Executing** each incremental query to capture intermediate results
4. **Explaining** what changed and why at each step

### Example Transformation

```sql
SELECT users.name, COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.author_id
WHERE users.role = 'author'
GROUP BY users.id
ORDER BY post_count DESC
LIMIT 10
```

Breaks down into:
1. FROM users → Get all users
2. LEFT JOIN posts → Combine with posts
3. WHERE role = 'author' → Filter to authors only
4. SELECT name, COUNT → Project specific columns
5. GROUP BY users.id → Group by user
6. ORDER BY post_count → Sort by post count
7. LIMIT 10 → Take top 10

## Adding New Datasets

To add a new dataset:

1. **Update `src/seed.ts`**:
   ```typescript
   db.exec(`
     CREATE TABLE your_table (
       id INTEGER PRIMARY KEY,
       name TEXT NOT NULL
     );
   `);
   
   // Insert data...
   ```

2. **Update `src/app/api/datasets/route.ts`**:
   ```typescript
   const datasets: Dataset[] = [
     // ... existing datasets
     {
       id: 'your-dataset',
       name: 'Your Dataset',
       description: '...',
       tables: [...],
       sampleQueries: [...]
     }
   ];
   ```

3. **Reseed the database**:
   ```bash
   npm run seed
   ```

## Adding New Lessons

Lessons are defined in `src/app/lessons/page.tsx`. To add a new lesson:

```typescript
{
  id: 'your-lesson-id',
  title: 'Lesson Title',
  description: 'What students will learn',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  topics: ['Topic 1', 'Topic 2'],
  duration: '15 min',
  dataset: 'Blog'
}
```

To implement interactive lessons, create a new route:
```
src/app/lessons/[slug]/page.tsx
```

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **SQLite** (better-sqlite3) - Local database
- **Monaco Editor** - SQL editor with syntax highlighting
- **node-sql-parser** - SQL parsing for step breakdown
- **Tailwind CSS** - Styling

## Security

### Query Safety
- Only `SELECT` queries are allowed
- Destructive operations (INSERT, UPDATE, DELETE, DROP) are blocked
- All user input is validated before execution

### SQL Injection Protection
- Identifiers are sanitized with regex validation
- Parameterized queries used where applicable
- Database runs in read-only mode for students

## Performance

- Queries execute in < 200ms for sample datasets
- Intermediate results limited to 100 rows for display
- Final results limited to 1000 rows
- Monaco editor uses web workers for syntax highlighting

## Known Limitations

1. **Step Engine**: Currently supports:
   - FROM, JOIN (INNER, LEFT, RIGHT)
   - WHERE, SELECT
   - ORDER BY, LIMIT
   - Basic GROUP BY and HAVING
   
   Not yet supported:
   - Subqueries
   - UNION
   - Complex expressions in SELECT
   - Window functions

2. **Datasets**: Fixed datasets, not user-uploadable

3. **Lessons**: Lesson framework in place, but interactive lesson pages need implementation

## Future Enhancements

- [ ] Complete interactive lesson implementations
- [ ] Shareable query permalinks
- [ ] Query plan visualization (EXPLAIN QUERY PLAN)
- [ ] "Explain like I'm 5" / "Explain like a developer" toggle
- [ ] Support for subqueries and UNIONs
- [ ] Query history and saved queries
- [ ] Dark/light theme toggle
- [ ] Mobile-optimized layout
- [ ] Export results to CSV/JSON

## Contributing

To contribute to SQL Lens:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use for educational purposes

## Acknowledgments

Built with 💜 for SQL learners everywhere

Inspired by the need for better SQL education tools that show, not just tell, how queries work.

---

## Common Issues

### Database not found
**Solution**: Run `npm run seed` to create and populate the database

### Monaco Editor not loading
**Solution**: Ensure `@monaco-editor/react` is installed and you're accessing the app over HTTP (not file://)

### Steps not showing
**Solution**: The step engine requires valid SELECT queries. Check the browser console for parsing errors.

### Slow query execution
**Solution**: The database has reasonable amounts of data. If queries are slow, check for missing indexes (though for educational purposes, the current setup is fine).

## Support

For questions, issues, or suggestions, please open an issue on the repository.

Happy learning! 🚀

