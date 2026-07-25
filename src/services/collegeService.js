import { supabase, isSupabaseConfigured } from './supabase';
import { mockColleges } from '../utils/mockData';

// In-memory copy so add/update/delete feel real during development,
// without needing Supabase connected yet. Resets on page refresh.
let _colleges = [...mockColleges];
let _nextId = _colleges.length + 1;

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch all colleges.
 * Real implementation (once connected):
 *   const { data, error } = await supabase.from('colleges').select('*, college_courses(*), college_placements(*, recruiters(*))').order('created_at', { ascending: false });
 */
export async function getColleges() {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('colleges').select('*');
    // if (error) throw error;
    // return data;
  }
  await delay();
  return _colleges;
}

/** Fetch a single college by id. */
export async function getCollegeById(id) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('colleges').select('*').eq('id', id).single();
    // if (error) throw error;
    // return data;
  }
  await delay(150);
  return _colleges.find((c) => c.id === id) ?? null;
}

/**
 * Insert a new college row.
 * Real implementation:
 *   const { data, error } = await supabase.from('colleges').insert(collegeData).select().single();
 */
export async function addCollege(collegeData) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('colleges').insert(collegeData).select().single();
    // if (error) throw error;
    // return data;
  }
  await delay(500);
  const record = { ...collegeData, id: _nextId++, created: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) };
  _colleges = [record, ...(_colleges || [])];
  return record;
}

/**
 * Update an existing college row.
 * Real implementation:
 *   const { data, error } = await supabase.from('colleges').update(collegeData).eq('id', id).select().single();
 */
export async function updateCollege(id, collegeData) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('colleges').update(collegeData).eq('id', id).select().single();
    // if (error) throw error;
    // return data;
  }
  await delay(500);
  const record = { ...collegeData, id };
  _colleges = _colleges.map((c) => (c.id === id ? record : c));
  return record;
}

/**
 * Delete a college row (cascades to courses/media/placements in Postgres via FK).
 * Real implementation:
 *   const { error } = await supabase.from('colleges').delete().eq('id', id);
 */
export async function deleteCollege(id) {
  if (isSupabaseConfigured) {
    // const { error } = await supabase.from('colleges').delete().eq('id', id);
    // if (error) throw error;
  }
  await delay(250);
  _colleges = _colleges.filter((c) => c.id !== id);
  return { success: true };
}
