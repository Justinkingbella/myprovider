
import { db, pool } from './db';
import { log } from './vite';
import fs from 'fs';
import path from 'path';

export async function applyMigrations() {
  try {
    log('Checking migrations table...');
    
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
    
    // Get list of applied migrations
    const { rows: appliedMigrations } = await pool.query(
      'SELECT name FROM migrations ORDER BY id'
    );
    const appliedMigrationNames = appliedMigrations.map(m => m.name);
    
    // Get migration files
    const migrationsDir = path.join(process.cwd(), 'migrations');
    
    // Create migrations directory if it doesn't exist
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir);
      log('Created migrations directory');
    }
    
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();  // Sort to ensure migrations run in order
    
    // Run migrations that haven't been applied yet
    for (const migrationFile of migrationFiles) {
      if (!appliedMigrationNames.includes(migrationFile)) {
        log(`Applying migration: ${migrationFile}`);
        
        const migrationPath = path.join(migrationsDir, migrationFile);
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');
        
        // Begin transaction
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          
          // Run migration
          await client.query(migrationSql);
          
          // Record migration
          await client.query(
            'INSERT INTO migrations (name) VALUES ($1)',
            [migrationFile]
          );
          
          await client.query('COMMIT');
          log(`Migration ${migrationFile} applied successfully`);
        } catch (error) {
          await client.query('ROLLBACK');
          log(`Migration ${migrationFile} failed: ${error}`);
          throw error;
        } finally {
          client.release();
        }
      } else {
        log(`Migration ${migrationFile} already applied`);
      }
    }
    
    log('Migrations completed successfully');
  } catch (error) {
    log(`Migration error: ${error}`);
    throw error;
  }
}
