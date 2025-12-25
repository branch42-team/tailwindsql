'use client';

/**
 * SQL Editor Component
 * 
 * Monaco-based SQL editor with syntax highlighting and auto-completion.
 */

import { Editor } from '@monaco-editor/react';

interface SQLEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  height?: string;
}

export function SQLEditor({ value, onChange, readOnly = false, height = '200px' }: SQLEditorProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border)]">
      <Editor
        height={height}
        defaultLanguage="sql"
        value={value}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

