import { supabase, isSupabaseConfigured } from './supabase';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Upsert the single college_placements row for a college.
 * Real implementation:
 *   const { data, error } = await supabase.from('college_placements')
 *     .upsert({ ...placementData, college_id: collegeId })
 *     .select().single();
 */
export async function savePlacements(collegeId, placementData) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('college_placements')
    //   .upsert({ ...placementData, college_id: collegeId })
    //   .select().single();
    // if (error) throw error;
    // return data;
  }
  await delay(400);
  return { ...placementData, id: `${collegeId}-placement`, college_id: collegeId };
}

/** Fetch the placement row for a college. */
export async function getPlacementByCollegeId(collegeId) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('college_placements').select('*').eq('college_id', collegeId).maybeSingle();
    // if (error) throw error;
    // return data;
  }
  await delay(150);
  return null;
}

/**
 * Replace all recruiters tied to a placement row.
 * Real implementation:
 *   await supabase.from('recruiters').delete().eq('placement_id', placementId);
 *   const { data, error } = await supabase.from('recruiters').insert(
 *     recruiters.map(r => ({ ...r, placement_id: placementId }))
 *   ).select();
 */
export async function saveRecruiters(placementId, recruiters) {
  if (isSupabaseConfigured) {
    // await supabase.from('recruiters').delete().eq('placement_id', placementId);
    // const { data, error } = await supabase.from('recruiters')
    //   .insert(recruiters.map((r) => ({ ...r, placement_id: placementId })))
    //   .select();
    // if (error) throw error;
    // return data;
  }
  await delay(300);
  return recruiters.map((r, i) => ({ ...r, id: `${placementId}-recruiter-${i}`, placement_id: placementId }));
}
