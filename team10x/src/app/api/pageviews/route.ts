import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'pageviews.json');

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCount(): number {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }), 'utf-8');
      return 0;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return typeof data.count === 'number' ? data.count : 0;
  } catch {
    return 0;
  }
}

function writeCount(count: number): void {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify({ count }), 'utf-8');
}

// GET — return current count
export async function GET() {
  const count = readCount();
  return NextResponse.json({ count });
}

// POST — increment and return new count
export async function POST() {
  const current = readCount();
  const next = current + 1;
  writeCount(next);
  return NextResponse.json({ count: next });
}
