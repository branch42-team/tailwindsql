import Link from 'next/link';

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  duration: string;
  dataset: string;
}

const lessons: Lesson[] = [
  {
    id: 'intro-to-select',
    title: 'Introduction to SELECT',
    description: 'Learn the basics of querying data with SELECT statements. Understand how to retrieve specific columns from a table.',
    difficulty: 'beginner',
    topics: ['SELECT', 'FROM', 'Column selection'],
    duration: '10 min',
    dataset: 'Blog'
  },
  {
    id: 'filtering-with-where',
    title: 'Filtering Data with WHERE',
    description: 'Master the WHERE clause to filter rows based on conditions. Learn about comparison operators and logical conditions.',
    difficulty: 'beginner',
    topics: ['WHERE', 'Conditions', 'Operators'],
    duration: '15 min',
    dataset: 'Blog'
  },
  {
    id: 'sorting-and-limiting',
    title: 'Sorting and Limiting Results',
    description: 'Use ORDER BY to sort your results and LIMIT to control how many rows are returned.',
    difficulty: 'beginner',
    topics: ['ORDER BY', 'LIMIT', 'ASC', 'DESC'],
    duration: '12 min',
    dataset: 'Shop'
  },
  {
    id: 'joins-basics',
    title: 'Understanding JOINs',
    description: 'Learn how to combine data from multiple tables using INNER JOIN. See how tables relate to each other.',
    difficulty: 'intermediate',
    topics: ['INNER JOIN', 'Foreign Keys', 'Relationships'],
    duration: '20 min',
    dataset: 'Blog'
  },
  {
    id: 'left-joins',
    title: 'LEFT JOIN Explained',
    description: 'Understand the difference between INNER and LEFT JOINs. Learn when to use LEFT JOIN and see null-extended rows.',
    difficulty: 'intermediate',
    topics: ['LEFT JOIN', 'NULL values', 'Outer joins'],
    duration: '18 min',
    dataset: 'Shop'
  },
  {
    id: 'aggregations',
    title: 'Aggregate Functions',
    description: 'Use COUNT, SUM, AVG, MIN, and MAX to perform calculations on your data.',
    difficulty: 'intermediate',
    topics: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
    duration: '20 min',
    dataset: 'Shop'
  },
  {
    id: 'group-by',
    title: 'Grouping with GROUP BY',
    description: 'Learn to group rows and perform aggregate calculations on each group.',
    difficulty: 'advanced',
    topics: ['GROUP BY', 'HAVING', 'Aggregates'],
    duration: '25 min',
    dataset: 'Shop'
  },
  {
    id: 'complex-joins',
    title: 'Many-to-Many Relationships',
    description: 'Master complex JOINs with junction tables. Learn to query many-to-many relationships.',
    difficulty: 'advanced',
    topics: ['Multiple JOINs', 'Junction tables', 'Complex queries'],
    duration: '30 min',
    dataset: 'Movies'
  },
];

export default function LessonsPage() {
  const beginnerLessons = lessons.filter(l => l.difficulty === 'beginner');
  const intermediateLessons = lessons.filter(l => l.difficulty === 'intermediate');
  const advancedLessons = lessons.filter(l => l.difficulty === 'advanced');

  return (
    <main className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            href="/"
            className="inline-block mb-4 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            SQL Lessons
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Learn SQL from scratch with interactive, step-by-step lessons
          </p>
        </div>

        {/* Beginner Lessons */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Beginner
            </h2>
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
              Start Here
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {beginnerLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        {/* Intermediate Lessons */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Intermediate
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {intermediateLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        {/* Advanced Lessons */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Advanced
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {advancedLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        {/* Free Play CTA */}
        <div className="glow-card p-8 text-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
          <h3 className="text-2xl font-bold mb-3">Ready to explore on your own?</h3>
          <p className="text-[var(--text-secondary)] mb-6">
            Try the playground to write and execute your own SQL queries
          </p>
          <Link
            href="/playground"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            Open Playground →
          </Link>
        </div>
      </div>
    </main>
  );
}

function LessonCard({ lesson }: { lesson: Lesson }) {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div className="glow-card p-6 hover:border-[var(--accent-cyan)] transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
          {lesson.title}
        </h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold border ${difficultyColors[lesson.difficulty]}`}>
          {lesson.difficulty}
        </span>
      </div>
      
      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
        {lesson.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {lesson.topics.map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 bg-[var(--bg-secondary)] text-xs rounded border border-[var(--border)]"
          >
            {topic}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span>⏱ {lesson.duration}</span>
        <span>📊 {lesson.dataset} Dataset</span>
      </div>
      
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <div className="text-center text-sm text-[var(--text-secondary)]">
          Coming Soon
        </div>
      </div>
    </div>
  );
}

