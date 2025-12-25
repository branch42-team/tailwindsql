import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Attribution Banner */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-block px-6 py-4 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              💡 We discovered{" "}
              <a href="https://tailwindsql.xyz/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium transition-colors">
                TailwindSQL
              </a>{" "}
              and thought: <span className="text-[var(--text-primary)] font-medium italic">&quot;What if frontend devs could finally speak SQL?&quot;</span>
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]/70 mt-2">
              Forked with 💜 by{" "}
              <a href="https://branch42.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                Branch42
              </a>{" "}
              — helping Tailwind lovers conquer databases, one className at a time.
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="text-cyan-300 text-sm font-medium">🎨 Inspired by TailwindSQL, rebuilt for frontend devs by Branch42</span>
          </div>

          <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[var(--brand-gold)] via-[var(--brand-blue)] to-[var(--brand-pink)] text-transparent bg-clip-text px-2 drop-shadow-[0_10px_40px_rgba(17,109,255,0.2)]">
            TailwindSQL by Branch42 — Learn SQL in Tailwind classNames
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            We forked TailwindSQL so frontend developers can pick up SQL faster.
            <br className="hidden sm:block" />
            <span className="text-[var(--accent-cyan)]">Crafted by Branch42 — book time at hello@branch42.com</span>
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-2">
            <Link
              href="/playground"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-sm sm:text-base"
            >
              Try the Playground →
            </Link>
            <Link
              href="/lessons"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--theme-secondary)] border border-[var(--border)] rounded-lg font-semibold text-black hover:border-[var(--accent-cyan)] transition-all text-sm sm:text-base"
            >
              Start Learning
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 px-2">
            <span className="badge badge-cyan">className Syntax</span>
            <span className="badge badge-brand-blue">Real-time Results</span>
            <span className="badge badge-brand-gold">Agency Support</span>
            <span className="badge badge-green">No Setup Required</span>
          </div>

          {/* Quick Example */}
          <div className="max-w-2xl mx-auto glow-card p-6">
            <div className="text-sm text-[var(--text-secondary)] mb-3">Quick Example:</div>
            <div className="bg-black/50 rounded-lg p-4 mb-4 overflow-x-auto">
              <code className="text-cyan-400 font-mono text-sm whitespace-nowrap">db-users-name-limit-5</code>
            </div>
            <div className="text-xs text-[var(--text-secondary)] mb-2">Generates this SQL:</div>
            <div className="bg-black/30 rounded-lg p-3 overflow-x-auto">
              <code className="text-green-400 font-mono text-xs">SELECT name FROM users LIMIT 5</code>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center px-2">
            <span className="text-[var(--accent-cyan)]">How</span> It Works
          </h2>
          <p className="text-center text-sm sm:text-base text-[var(--text-secondary)] mb-8 sm:mb-12 max-w-2xl mx-auto px-2">Write queries using TailwindSQL&apos;s intuitive className syntax</p>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="glow-card p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--accent-cyan)]">1. Build with Classes</h3>
              <p className="text-[var(--text-secondary)] text-sm">
                Write queries using intuitive class names: <code className="text-cyan-400">db-users-name-limit-5</code>
              </p>
            </div>

            <div className="glow-card p-6 border-[var(--brand-blue)]/20 hover:border-[var(--brand-blue)]/50 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--brand-blue)]">2. See Live Results</h3>
              <p className="text-[var(--text-secondary)] text-sm">Results update instantly as you type. See the generated SQL and choose how to render data.</p>
            </div>

            <div className="glow-card p-6 border-[var(--brand-pink)]/20 hover:border-[var(--brand-pink)]/50 transition-colors">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--brand-pink)]">3. Add JOINs Easily</h3>
              <p className="text-[var(--text-secondary)] text-sm">Toggle JOIN mode and visually configure table relationships without complex syntax.</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center px-2">
            <span className="text-[var(--accent-purple)]">Features</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">🎨</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">TailwindSQL Syntax</h3>
                <p className="text-[var(--text-secondary)] text-sm">Query databases using intuitive className syntax. Perfect for beginners and a unique approach to SQL!</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">📊</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Live Data Preview</h3>
                <p className="text-[var(--text-secondary)] text-sm">Work with real datasets. See actual rows and columns, not abstract examples.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">🎓</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Guided Lessons</h3>
                <p className="text-[var(--text-secondary)] text-sm">Follow structured tutorials from basics to advanced topics like JOINs and aggregations.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">🗄️</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Multiple Datasets</h3>
                <p className="text-[var(--text-secondary)] text-sm">Practice with blog, e-commerce, and movie databases. Each with realistic data.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">🔗</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Visual JOIN Explanations</h3>
                <p className="text-[var(--text-secondary)] text-sm">Finally understand INNER, LEFT, and RIGHT JOINs with visual matching examples.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Instant Feedback</h3>
                <p className="text-[var(--text-secondary)] text-sm">Get helpful error messages and learn from mistakes without consequences.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4">
              <div className="text-2xl">🎯</div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-[var(--text-primary)]">Multiple Render Modes</h3>
                <p className="text-[var(--text-secondary)] text-sm">Display results as tables, lists, or JSON. Choose the format that works best for your use case.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Datasets Preview */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center px-2">
            <span className="text-[var(--accent-cyan)]">Practice</span> Datasets
          </h2>
          <p className="text-center text-sm sm:text-base text-[var(--text-secondary)] mb-8 sm:mb-12 max-w-2xl mx-auto px-2">Three realistic databases to learn with</p>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/playground?q=db-users-name-limit-10" className="glow-card p-6 hover:border-[var(--accent-cyan)] transition-all cursor-pointer group">
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">Blog Platform</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Users, posts, and comments. Perfect for learning JOINs and basic filtering.</p>
              <div className="text-xs text-[var(--text-secondary)] mb-3">
                Tables: <span className="text-cyan-400">users, posts, comments</span>
              </div>
              <div className="text-xs text-cyan-400 font-medium">Click to try →</div>
            </Link>

            <Link href="/playground?q=db-products-name-orderby-price-desc-limit-10" className="glow-card p-6 hover:border-[var(--accent-purple)] transition-all cursor-pointer group">
              <div className="text-4xl mb-3">🛍️</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-purple)] transition-colors">E-Commerce Shop</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Customers, products, and orders. Great for aggregations and complex queries.</p>
              <div className="text-xs text-[var(--text-secondary)] mb-3">
                Tables: <span className="text-purple-400">customers, products, orders, order_items</span>
              </div>
              <div className="text-xs text-purple-400 font-medium">Click to try →</div>
            </Link>

            <Link href="/playground?q=db-movies-title-orderby-rating-desc-limit-10" className="glow-card p-6 hover:border-[var(--accent-pink)] transition-all cursor-pointer group">
              <div className="text-4xl mb-3">🎬</div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-[var(--accent-pink)] transition-colors">Movie Database</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">Movies, actors, and reviews. Master many-to-many relationships.</p>
              <div className="text-xs text-[var(--text-secondary)] mb-3">
                Tables: <span className="text-pink-400">movies, actors, movie_actors, reviews</span>
              </div>
              <div className="text-xs text-pink-400 font-medium">Click to try →</div>
            </Link>
          </div>
        </section>

        {/* Agency Support CTA */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="agency-card">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-wide text-[var(--text-secondary)]">Branch42 Agency</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">Need help shipping production-ready data products?</h3>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-3xl">
                We&apos;re the team that forked TailwindSQL to make SQL friendlier for frontend devs. Let us design, build, and secure your next dashboard, workflow, or SaaS — from schema to shipping.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="https://cal.com/branch42-team/consultancy" className="btn-gradient" target="_blank" rel="noopener noreferrer">
                  Book a consult ↗
                </Link>
                <Link href="mailto:hello@branch42.com" className="btn-outline">
                  hello@branch42.com
                </Link>
              </div>
            </div>
            <div className="agency-card-panel">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--brand-blue)] to-[var(--brand-gold)] flex items-center justify-center text-black font-bold">B42</div>
                <div>
                  <p className="text-[var(--text-primary)] font-semibold">Branch42</p>
                  <p>Full-stack product studio</p>
                </div>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                Credits: TailwindSQL inspired this experience. We forked it, added lessons, data previews, and calendaring to help frontend developers build SQL muscle.
              </p>
              <p className="text-xs text-[var(--text-secondary)]/80">Stack: Next.js, React Server Components, SQLite. Deploy-ready with agency support.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mb-12 sm:mb-16 px-2">
          <div className="glow-card p-8 sm:p-12 bg-gradient-to-br from-[var(--brand-blue)]/15 via-[var(--brand-gold)]/12 to-[var(--accent-purple)]/15">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-[var(--text-secondary)] mb-6 sm:mb-8 max-w-2xl mx-auto">
              Start with guided lessons or jump straight into the playground — and if you need an expert build team, Branch42 is one click away.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/playground" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                Open Playground
              </Link>
              <Link
                href="/lessons"
                className="px-8 py-4 bg-[var(--theme-secondary)] border border-[var(--border)] rounded-lg font-semibold text-black hover:border-[var(--accent-cyan)] transition-all"
              >
                Start Lessons
              </Link>
              <Link
                href="mailto:hello@branch42.com"
                className="px-8 py-4 border border-[var(--brand-gold)]/70 rounded-lg font-semibold text-[var(--text-primary)] hover:border-[var(--brand-blue)] transition-all"
              >
                Talk to Branch42
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-[var(--text-secondary)] text-xs sm:text-sm space-y-3 px-2 pb-4">
          <p>Built with 💜 using Next.js, React Server Components, and SQLite</p>
          <p className="text-[var(--text-secondary)]/70">
            Originally created by{" "}
            <a href="https://tailwindsql.xyz/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
              TailwindSQL
            </a>{" "}
            • Forked & enhanced by{" "}
            <a href="https://branch42.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">
              Branch42
            </a>
          </p>
          <p className="text-[var(--text-secondary)]/70">
            Contact:{" "}
            <a href="mailto:hello@branch42.com" className="text-[var(--accent-cyan)] hover:text-[var(--brand-blue)] underline underline-offset-2 transition-colors">
              hello@branch42.com
            </a>{" "}
            • Book:{" "}
            <a
              href="https://cal.com/branch42-team/consultancy"
              className="text-[var(--accent-cyan)] hover:text-[var(--brand-blue)] underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              cal.com/branch42-team/consultancy
            </a>
          </p>
          <p className="text-[var(--text-secondary)]/50 text-xs">className your way to database queries</p>
        </footer>
      </div>
    </main>
  );
}
