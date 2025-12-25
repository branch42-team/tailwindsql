/**
 * SQL Step Execution Engine
 * 
 * Breaks down SQL queries into steps and executes each incrementally
 * to show how each clause transforms the data.
 */

import { Parser } from 'node-sql-parser';
import Database from 'better-sqlite3';

export interface SQLStep {
  stepNumber: number;
  clauseType: 'FROM' | 'JOIN' | 'WHERE' | 'SELECT' | 'GROUP BY' | 'HAVING' | 'ORDER BY' | 'LIMIT';
  sql: string;
  explanation: string;
  results: Record<string, unknown>[];
  rowCount: number;
  affectedColumns?: string[];
  filterInfo?: {
    columnsFiltered: string[];
    rowsBefore: number;
    rowsAfter: number;
  };
}

export interface StepExecutionResult {
  originalQuery: string;
  steps: SQLStep[];
  finalResults: Record<string, unknown>[];
  totalRowsProcessed: number;
  executionTime: number;
  error?: string;
}

const parser = new Parser();

/**
 * Validates that the SQL query is safe (SELECT only)
 */
function validateQuery(sql: string): void {
  const upperSQL = sql.trim().toUpperCase();
  if (!upperSQL.startsWith('SELECT')) {
    throw new Error('Only SELECT queries are allowed');
  }
  
  const dangerousKeywords = ['DROP', 'DELETE', 'INSERT', 'UPDATE', 'ALTER', 'CREATE', 'TRUNCATE'];
  for (const keyword of dangerousKeywords) {
    if (upperSQL.includes(keyword)) {
      throw new Error(`Destructive operation not allowed: ${keyword}`);
    }
  }
}

/**
 * Parse SQL query into an AST
 */
function parseSQLQuery(sql: string) {
  try {
    const ast = parser.astify(sql, { database: 'sqlite' });
    return Array.isArray(ast) ? ast[0] : ast;
  } catch (error) {
    throw new Error(`SQL Parse Error: ${error instanceof Error ? error.message : 'Invalid SQL'}`);
  }
}

/**
 * Extract table names from query
 */
function extractTableNames(ast: any): string[] {
  const tables: string[] = [];
  
  if (ast.from) {
    for (const fromItem of ast.from) {
      if (fromItem.table) {
        tables.push(fromItem.table);
      }
    }
  }
  
  return tables;
}

/**
 * Execute a SQL query and return results
 */
function executeQuery(db: Database.Database, sql: string): Record<string, unknown>[] {
  try {
    const stmt = db.prepare(sql);
    return stmt.all() as Record<string, unknown>[];
  } catch (error) {
    console.error('Query execution error:', error);
    return [];
  }
}

/**
 * Build incremental SQL for each step
 */
function buildIncrementalSteps(ast: any, originalSQL: string): Array<{
  type: string;
  sql: string;
  explanation: string;
}> {
  const steps: Array<{ type: string; sql: string; explanation: string }> = [];
  
  // Step 1: FROM (base table selection)
  if (ast.from && ast.from.length > 0) {
    const fromTable = ast.from[0].table;
    const fromSQL = `SELECT * FROM ${fromTable}`;
    steps.push({
      type: 'FROM',
      sql: fromSQL,
      explanation: `Start with all rows from the <strong>${fromTable}</strong> table. This is our base dataset.`
    });
    
    // Step 2: JOIN (if present)
    if (ast.from.length > 1 || ast.from[0].join) {
      let joinSQL = `SELECT * FROM ${fromTable}`;
      let joinExplanations: string[] = [];
      
      for (const fromItem of ast.from) {
        if (fromItem.join) {
          const joinType = fromItem.join;
          const joinTable = fromItem.table;
          const onClause = fromItem.on;
          
          joinSQL += ` ${joinType} JOIN ${joinTable} ON ${onClause.left.column} = ${onClause.right.column}`;
          joinExplanations.push(`Perform a <strong>${joinType} JOIN</strong> with <strong>${joinTable}</strong> table on matching <code>${onClause.left.column} = ${onClause.right.column}</code>.`);
        }
      }
      
      if (joinExplanations.length > 0) {
        steps.push({
          type: 'JOIN',
          sql: joinSQL,
          explanation: joinExplanations.join(' ') + ' This combines rows from both tables where the join condition is met.'
        });
      }
    }
  }
  
  // Step 3: WHERE (filtering)
  if (ast.where) {
    const prevStep = steps[steps.length - 1];
    const whereSQL = `${prevStep.sql} WHERE ${formatWhereClause(ast.where)}`;
    steps.push({
      type: 'WHERE',
      sql: whereSQL,
      explanation: `Filter rows using the <strong>WHERE</strong> clause. Only rows matching the condition <code>${formatWhereClause(ast.where)}</code> are kept.`
    });
  }
  
  // Step 4: SELECT (column projection)
  if (ast.columns && ast.columns !== '*') {
    const prevStep = steps[steps.length - 1];
    const baseSQL = prevStep.sql.replace(/^SELECT \*/, `SELECT ${formatColumns(ast.columns)}`);
    steps.push({
      type: 'SELECT',
      sql: baseSQL,
      explanation: `Select specific columns: <strong>${formatColumns(ast.columns)}</strong>. This narrows down which data we want to see.`
    });
  }
  
  // Step 5: GROUP BY (if present)
  if (ast.groupby) {
    const prevStep = steps[steps.length - 1];
    const groupBySQL = `${prevStep.sql} GROUP BY ${formatGroupBy(ast.groupby)}`;
    steps.push({
      type: 'GROUP BY',
      sql: groupBySQL,
      explanation: `Group rows by <strong>${formatGroupBy(ast.groupby)}</strong>. Rows with the same values in these columns are combined together.`
    });
  }
  
  // Step 6: HAVING (if present)
  if (ast.having) {
    const prevStep = steps[steps.length - 1];
    const havingSQL = `${prevStep.sql} HAVING ${formatWhereClause(ast.having)}`;
    steps.push({
      type: 'HAVING',
      sql: havingSQL,
      explanation: `Filter grouped results using <strong>HAVING</strong> clause: <code>${formatWhereClause(ast.having)}</code>.`
    });
  }
  
  // Step 7: ORDER BY (sorting)
  if (ast.orderby) {
    const prevStep = steps[steps.length - 1];
    const orderBySQL = `${prevStep.sql} ORDER BY ${formatOrderBy(ast.orderby)}`;
    steps.push({
      type: 'ORDER BY',
      sql: orderBySQL,
      explanation: `Sort results by <strong>${formatOrderBy(ast.orderby)}</strong>. This changes the order but not the content of rows.`
    });
  }
  
  // Step 8: LIMIT (if present)
  if (ast.limit) {
    const prevStep = steps[steps.length - 1];
    const limitValue = ast.limit.value[0].value;
    const limitSQL = `${prevStep.sql} LIMIT ${limitValue}`;
    steps.push({
      type: 'LIMIT',
      sql: limitSQL,
      explanation: `Limit results to the first <strong>${limitValue}</strong> rows. All other rows are discarded.`
    });
  }
  
  return steps;
}

// Helper functions to format AST elements
function formatWhereClause(where: any): string {
  if (!where) return '';
  
  if (where.operator) {
    const left = where.left.column || where.left.value || JSON.stringify(where.left);
    const right = where.right.column || where.right.value || JSON.stringify(where.right);
    return `${left} ${where.operator} ${right}`;
  }
  
  return JSON.stringify(where);
}

function formatColumns(columns: any): string {
  if (columns === '*') return '*';
  if (Array.isArray(columns)) {
    return columns.map((col: any) => {
      if (col.expr && col.expr.column) return col.expr.column;
      if (col.as) return `${col.expr.column} AS ${col.as}`;
      return col.expr?.column || '*';
    }).join(', ');
  }
  return '*';
}

function formatGroupBy(groupby: any): string {
  if (Array.isArray(groupby)) {
    return groupby.map((g: any) => g.column).join(', ');
  }
  return groupby.column || '';
}

function formatOrderBy(orderby: any): string {
  if (Array.isArray(orderby)) {
    return orderby.map((o: any) => `${o.expr.column} ${o.type || 'ASC'}`).join(', ');
  }
  return `${orderby.expr.column} ${orderby.type || 'ASC'}`;
}

/**
 * Execute SQL query step-by-step
 */
export function executeStepByStep(
  db: Database.Database,
  sql: string
): StepExecutionResult {
  const startTime = Date.now();
  
  try {
    // Validate query
    validateQuery(sql);
    
    // Parse query
    const ast = parseSQLQuery(sql);
    
    // Build incremental steps
    const stepBuilders = buildIncrementalSteps(ast, sql);
    
    // Execute each step
    const steps: SQLStep[] = [];
    let previousRowCount = 0;
    
    for (let i = 0; i < stepBuilders.length; i++) {
      const stepBuilder = stepBuilders[i];
      const results = executeQuery(db, stepBuilder.sql);
      const rowCount = results.length;
      
      const step: SQLStep = {
        stepNumber: i + 1,
        clauseType: stepBuilder.type as any,
        sql: stepBuilder.sql,
        explanation: stepBuilder.explanation,
        results: results.slice(0, 100), // Limit to first 100 rows for display
        rowCount: rowCount,
      };
      
      // Add filter info for WHERE and HAVING steps
      if (stepBuilder.type === 'WHERE' || stepBuilder.type === 'HAVING') {
        step.filterInfo = {
          columnsFiltered: [], // Would need more parsing to determine
          rowsBefore: previousRowCount,
          rowsAfter: rowCount,
        };
      }
      
      steps.push(step);
      previousRowCount = rowCount;
    }
    
    // Execute final query for complete results
    const finalResults = executeQuery(db, sql);
    
    const executionTime = Date.now() - startTime;
    
    return {
      originalQuery: sql,
      steps,
      finalResults: finalResults.slice(0, 1000), // Limit final results
      totalRowsProcessed: finalResults.length,
      executionTime,
    };
  } catch (error) {
    const executionTime = Date.now() - startTime;
    return {
      originalQuery: sql,
      steps: [],
      finalResults: [],
      totalRowsProcessed: 0,
      executionTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

