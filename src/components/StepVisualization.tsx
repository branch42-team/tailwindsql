'use client';

/**
 * Step Visualization Component
 * 
 * Shows SQL execution steps as clickable chips with explanations.
 */

import type { SQLStep } from '@/lib/sql-stepper';

interface StepVisualizationProps {
  steps: SQLStep[];
  currentStep: number;
  onStepClick: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  isPlaying: boolean;
}

const clauseColors: Record<string, string> = {
  'FROM': 'bg-blue-500/20 border-blue-500/50 text-blue-400',
  'JOIN': 'bg-purple-500/20 border-purple-500/50 text-purple-400',
  'WHERE': 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400',
  'SELECT': 'bg-green-500/20 border-green-500/50 text-green-400',
  'GROUP BY': 'bg-orange-500/20 border-orange-500/50 text-orange-400',
  'HAVING': 'bg-red-500/20 border-red-500/50 text-red-400',
  'ORDER BY': 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400',
  'LIMIT': 'bg-pink-500/20 border-pink-500/50 text-pink-400',
};

export function StepVisualization({
  steps,
  currentStep,
  onStepClick,
  onNext,
  onPrev,
  onPlay,
  isPlaying,
}: StepVisualizationProps) {
  const current = steps[currentStep];

  return (
    <div className="glow-card p-4 space-y-4">
      {/* Step Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Execution Steps
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentStep === 0}
            className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Previous Step"
          >
            ←
          </button>
          <button
            onClick={onPlay}
            disabled={isPlaying}
            className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Play All Steps"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            onClick={onNext}
            disabled={currentStep === steps.length - 1}
            className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Next Step"
          >
            →
          </button>
        </div>
      </div>

      {/* Step Chips */}
      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          const colorClass = clauseColors[step.clauseType] || 'bg-gray-500/20 border-gray-500/50 text-gray-400';

          return (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all
                ${isActive ? colorClass + ' scale-110 shadow-lg' : ''}
                ${isPast ? 'opacity-60' : ''}
                ${!isActive && !isPast ? 'opacity-40' : ''}
                hover:opacity-100 hover:scale-105
              `}
              title={`Step ${step.stepNumber}: ${step.clauseType}`}
            >
              <span className="hidden sm:inline">{step.stepNumber}. </span>
              {step.clauseType}
            </button>
          );
        })}
      </div>

      {/* Current Step Info */}
      {current && (
        <div className="bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--border)]">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${clauseColors[current.clauseType]}`}>
                Step {current.stepNumber}: {current.clauseType}
              </span>
              <span className="text-xs text-[var(--text-secondary)]">
                {current.rowCount} row{current.rowCount !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Explanation */}
          <div 
            className="text-sm text-[var(--text-primary)] mb-3 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: current.explanation }}
          />

          {/* SQL for this step */}
          <div className="bg-black/30 rounded p-3 overflow-x-auto">
            <code className="text-xs text-cyan-400 font-mono whitespace-pre">
              {current.sql}
            </code>
          </div>

          {/* Filter Info */}
          {current.filterInfo && (
            <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs">
              <div className="font-semibold text-yellow-400 mb-1">Rows Filtered:</div>
              <div className="text-[var(--text-secondary)]">
                {current.filterInfo.rowsBefore} → {current.filterInfo.rowsAfter} rows
                {current.filterInfo.rowsBefore > current.filterInfo.rowsAfter && (
                  <span className="text-red-400 ml-2">
                    (removed {current.filterInfo.rowsBefore - current.filterInfo.rowsAfter})
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
          {currentStep + 1} / {steps.length}
        </span>
      </div>
    </div>
  );
}

