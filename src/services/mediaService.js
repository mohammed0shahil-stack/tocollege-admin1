import { supabase, isSupabaseConfigured } from './supabase';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Persist college_media rows (gallery images, videos, brochure) once the
 * files themselves are already uploaded via storageService and you have
 * their public URLs. Keeping "upload the bytes" and "save the record"
 * as separate steps mirrors how Supabase Storage + Postgres are used together.
 *
 * Real implementation:
 *   const { data, error } = await supabase.from('college_media').insert(
 *     mediaItems.map(m => ({ ...m, college_id: collegeId }))
 *   ).select();
 */
export async function saveMedia(collegeId, mediaItems) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('college_media')
    //   .insert(mediaItems.map((m) => ({ ...m, college_id: collegeId })))
    //   .select();
    // if (error) throw error;
    // return data;
  }
  await delay(400);
  return mediaItems.map((m, i) => ({ ...m, id: `${collegeId}-media-${i}`, college_id: collegeId }));
}

/** Fetch all media rows for a college. */
export async function getMediaByCollegeId(collegeId) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('college_media').select('*').eq('college_id', collegeId);
    // if (error) throw error;
    // return data;
  }
  await delay(150);
  return [];
}

/** Delete a single media row (e.g. removing one gallery image). */
export async function deleteMedia(mediaId) {
  if (isSupabaseConfigured) {
    // const { error } = await supabase.from('college_media').delete().eq('id', mediaId);
    // if (error) throw error;
  }
  await delay(150);
  return { success: true };
}
