/**
 * SQL Lens Execute API
 * 
 * Executes SQL queries with step-by-step breakdown for educational purposes.
 */

import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { executeStepByStep } from '@/lib/sql-stepper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sql } = body;

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid SQL query' },
        { status: 400 }
      );
    }

    // Execute the query step-by-step
    const result = executeStepByStep(db, sql.trim());

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Query execution failed';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

