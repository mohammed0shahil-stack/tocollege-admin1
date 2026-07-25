import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client — NOT CONNECTED YET.
 *
 * This reads from Vite env vars that don't exist yet on purpose. Until
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are set in a .env file,
 * `supabase` stays null and every service function below falls back to
 * mock data instead of throwing. This lets the whole app run and be
 * demoed with `npm run dev` before any backend work starts.
 *
 * To connect for real:
 *   1. Create a Supabase project.
 *   2. Copy .env.example to .env and fill in both values.
 *   3. Swap the mock-returning code in each service file for the
 *      commented-out supabase calls already sketched in those files.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isSupabaseConfigured && import.meta.env.DEV) {
  // Expected during this phase of the project — see comment above.
  console.info('[supabase] Not configured yet — services are serving mock data.');
}
