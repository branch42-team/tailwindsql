'use client';

/**
 * SQL Playground Component
 * 
 * Interactive SQL learning environment with step-by-step execution,
 * visual explanations, and live data previews.
 */

import { useState, useEffect } from 'react';
import { SQLEditor } from './SQLEditor';
import { StepVisualization } from './StepVisualization';
import { DataViewer } from './DataViewer';
import { Dataset } from '@/app/api/datasets/route';
import type { StepExecutionResult } from '@/lib/sql-stepper';

interface SchemaTable {
  name: string;
  columns: { name: string; type: string }[];
  rowCount: number;
  data: Record<string, unknown>[];
}

export function SQLPlayground() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string>('blog');
  const [schema, setSchema] = useState<{ tables: SchemaTable[] } | null>(null);
  const [sql, setSQL] = useState('SELECT * FROM users LIMIT 10');
  const [executionResult, setExecutionResult] = useState<StepExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load datasets on mount
  useEffect(() => {
    fetch('/api/datasets')
      .then(res => res.json())
      .then(data => {
        if (data.datasets) {
          setDatasets(data.datasets);
        }
      })
      .catch(err => console.error('Failed to load datasets:', err));
  }, []);

  // Load schema on mount or dataset change
  useEffect(() => {
    fetch('/api/schema')
      .then(res => res.json())
      .then(data => {
        if (data.tables) {
          setSchema({ tables: data.tables });
        }
      })
      .catch(err => console.error('Failed to load schema:', err));
  }, [selectedDataset]);

  // Execute SQL query
  const executeQuery = async () => {
    if (!sql.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentStep(0);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setExecutionResult(null);
      } else {
        setExecutionResult(data);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute query');
      setExecutionResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Step through controls
  const goToStep = (step: number) => {
    if (executionResult && step >= 0 && step < executionResult.steps.length) {
      setCurrentStep(step);
      setIsPlaying(false);
    }
  };

  const nextStep = () => {
    if (executionResult && currentStep < executionResult.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playSteps = () => {
    if (executionResult) {
      setIsPlaying(true);
      setCurrentStep(0);
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && executionResult) {
      const timer = setTimeout(() => {
        if (currentStep < executionResult.steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
        }
      }, 2000); // 2 seconds per step

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, executionResult]);

  // Load sample query
  const loadSampleQuery = (sampleSQL: string) => {
    setSQL(sampleSQL);
    setExecutionResult(null);
    setError(null);
  };

  const currentDataset = datasets.find(d => d.id === selectedDataset);

  return (
    <div className="max-w-[1800px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            SQL Playground
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Write SQL, step through execution, and learn interactively
          </p>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-[var(--text-secondary)]">Dataset:</label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:border-[var(--accent-cyan)] outline-none"
          >
            {datasets.map(ds => (
              <option key={ds.id} value={ds.id}>
                {ds.icon} {ds.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left Column: Editor + Controls */}
        <div className="space-y-4">
          {/* SQL Editor */}
          <div className="glow-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">SQL Editor</h2>
              <button
                onClick={executeQuery}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Running...' : '▶ Run Query'}
              </button>
            </div>
            
            <SQLEditor value={sql} onChange={setSQL} />
          </div>

          {/* Sample Queries */}
          {currentDataset && (
            <div className="glow-card p-4">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                Sample Queries
              </h3>
              <div className="space-y-2">
                {currentDataset.sampleQueries.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadSampleQuery(sq.sql)}
                    className="w-full text-left px-3 py-2 bg-[var(--bg-secondary)] hover:bg-white/5 border border-[var(--border)] hover:border-[var(--accent-cyan)] rounded-lg text-xs transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[var(--text-primary)]">{sq.title}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        sq.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        sq.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {sq.difficulty}
                      </span>
                    </div>
                    <code className="text-[var(--text-secondary)] text-xs break-all">
                      {sq.sql.substring(0, 60)}{sq.sql.length > 60 ? '...' : ''}
                    </code>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Schema Browser */}
          {schema && (
            <div className="glow-card p-4">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                Database Schema
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {schema.tables.map(table => (
                  <div key={table.name} className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-cyan-400 text-sm">{table.name}</span>
                      <span className="text-xs text-[var(--text-secondary)]">{table.rowCount} rows</span>
                    </div>
                    <div className="space-y-1">
                      {table.columns.map(col => (
                        <div key={col.name} className="flex items-center gap-2 text-xs">
                          <span className="text-[var(--text-primary)]">{col.name}</span>
                          <span className="text-[var(--text-secondary)]">{col.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Results + Steps */}
        <div className="space-y-4">
          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
              <div className="font-semibold mb-1">⚠️ Error</div>
              {error}
            </div>
          )}

          {/* Step Visualization */}
          {executionResult && executionResult.steps.length > 0 && (
            <StepVisualization
              steps={executionResult.steps}
              currentStep={currentStep}
              onStepClick={goToStep}
              onNext={nextStep}
              onPrev={prevStep}
              onPlay={playSteps}
              isPlaying={isPlaying}
            />
          )}

          {/* Data Viewer */}
          <DataViewer
            executionResult={executionResult}
            currentStep={currentStep}
            schema={schema}
          />
        </div>
      </div>
    </div>
  );
}

