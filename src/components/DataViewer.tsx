'use client';

/**
 * Data Viewer Component
 * 
 * Displays database tables, intermediate results, and final query results in tabs.
 */

import { useState } from 'react';
import type { StepExecutionResult } from '@/lib/sql-stepper';

interface DataViewerProps {
  executionResult: StepExecutionResult | null;
  currentStep: number;
  schema: { tables: SchemaTable[] } | null;
}

interface SchemaTable {
  name: string;
  columns: { name: string; type: string }[];
  rowCount: number;
  data: Record<string, unknown>[];
}

type TabType = 'tables' | 'intermediate' | 'final';

export function DataViewer({ executionResult, currentStep, schema }: DataViewerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tables');

  const renderTable = (data: Record<string, unknown>[], title?: string, limit: number = 100) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center py-12 text-[var(--text-secondary)]">
          <div className="text-4xl mb-2">📊</div>
          <p>No data to display</p>
        </div>
      );
    }

    const displayData = data.slice(0, limit);
    const headers = Object.keys(displayData[0]);

    return (
      <div className="space-y-3">
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
            <span className="text-xs text-[var(--text-secondary)]">
              {displayData.length} of {data.length} rows
            </span>
          </div>
        )}
        <div className="overflow-x-auto -mx-2">
          <table className="w-full border-collapse text-xs min-w-[600px]">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 text-left font-semibold text-cyan-400 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b border-[var(--border)] hover:bg-white/5 transition-colors"
                >
                  {headers.map((header) => (
                    <td
                      key={header}
                      className="px-3 py-2 text-[var(--text-primary)] max-w-[200px] truncate"
                      title={String(row[header] ?? '')}
                    >
                      {String(row[header] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const tabs: { id: TabType; label: string; badge?: string }[] = [
    { id: 'tables', label: 'Tables', badge: schema ? String(schema.tables.length) : undefined },
    { id: 'intermediate', label: 'Current Step', badge: executionResult ? String(executionResult.steps[currentStep]?.rowCount || 0) : undefined },
    { id: 'final', label: 'Final Result', badge: executionResult ? String(executionResult.totalRowsProcessed) : undefined },
  ];

  return (
    <div className="glow-card p-4 space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 rounded-t-lg text-sm font-medium transition-all
              ${activeTab === tab.id
                ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border-b-2 border-cyan-400'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }
            `}
          >
            {tab.label}
            {tab.badge && (
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-h-[600px] overflow-y-auto">
        {activeTab === 'tables' && schema && (
          <div className="space-y-6">
            {schema.tables.map((table) => (
              <div key={table.name}>
                {renderTable(table.data, `${table.name} (${table.rowCount} total rows)`, 10)}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'intermediate' && executionResult && (
          <div>
            {executionResult.steps[currentStep] ? (
              renderTable(
                executionResult.steps[currentStep].results,
                `After ${executionResult.steps[currentStep].clauseType}`
              )
            ) : (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                <p>No step data available</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'final' && executionResult && (
          <div>
            {renderTable(executionResult.finalResults, 'Final Query Result')}
            <div className="mt-4 p-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Total Rows:</span>
                <span className="text-[var(--text-primary)] font-semibold">{executionResult.totalRowsProcessed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Execution Time:</span>
                <span className="text-[var(--text-primary)] font-semibold">{executionResult.executionTime}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-secondary)]">Steps:</span>
                <span className="text-[var(--text-primary)] font-semibold">{executionResult.steps.length}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'intermediate' && !executionResult && (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            <div className="text-4xl mb-2">⚡</div>
            <p>Run a query to see step-by-step results</p>
          </div>
        )}

        {activeTab === 'final' && !executionResult && (
          <div className="text-center py-12 text-[var(--text-secondary)]">
            <div className="text-4xl mb-2">🎯</div>
            <p>Run a query to see final results</p>
          </div>
        )}
      </div>
    </div>
  );
}

