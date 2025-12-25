import { Playground } from '@/components/Playground';
import Link from 'next/link';

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-block mb-4 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Interactive Playground
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-2">
            Type a TailwindSQL query and see results update in real-time
          </p>
          <p className="text-sm text-[var(--text-secondary)]/70">
            Available tables: users, posts, comments, customers, products, orders, order_items, movies, actors, movie_actors, reviews
          </p>
        </div>

        {/* Playground */}
        <div className="glow-card p-6 sm:p-8">
          <Playground />
        </div>

        {/* Syntax Guide */}
        <div className="mt-8 glow-card p-6">
          <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">
            TailwindSQL Syntax Guide
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[var(--text-secondary)] mb-2">Basic query:</div>
              <code className="block bg-black/40 p-3 rounded text-cyan-400 font-mono">
                db-&#123;table&#125;-&#123;columns&#125;-where-&#123;field&#125;-&#123;value&#125;-limit-&#123;n&#125;
              </code>
            </div>
            <div>
              <div className="text-[var(--text-secondary)] mb-2">With JOIN:</div>
              <code className="block bg-black/40 p-3 rounded text-cyan-400 font-mono whitespace-pre-wrap">
                Enable the "+ Join" toggle and fill in:
                • table: posts
                • on: id-author_id  
                • select: title
                • type: left/inner/right
              </code>
            </div>
            <div>
              <div className="text-[var(--text-secondary)] mb-2">Examples:</div>
              <ul className="space-y-2 text-[var(--text-primary)]">
                <li>• <code className="text-purple-400">db-users-name-limit-10</code> - Get 10 user names</li>
                <li>• <code className="text-purple-400">db-posts-title-where-published-1-orderby-views-desc-limit-10</code> - Top posts by views</li>
                <li>• <code className="text-purple-400">db-products-name-orderby-price-asc-limit-5</code> - 5 cheapest products</li>
                <li>• <code className="text-purple-400">db-movies-title-orderby-rating-desc-limit-10</code> - Top rated movies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

