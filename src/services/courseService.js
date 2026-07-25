import { supabase, isSupabaseConfigured } from './supabase';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Replace all courses for a college with a new set (simplest mental model
 * for a wizard step that lets you freely add/remove rows before saving).
 * Real implementation:
 *   await supabase.from('college_courses').delete().eq('college_id', collegeId);
 *   const { data, error } = await supabase.from('college_courses').insert(
 *     courses.map(c => ({ ...c, college_id: collegeId }))
 *   ).select();
 */
export async function saveCourses(collegeId, courses) {
  if (isSupabaseConfigured) {
    // await supabase.from('college_courses').delete().eq('college_id', collegeId);
    // const { data, error } = await supabase.from('college_courses')
    //   .insert(courses.map((c) => ({ ...c, college_id: collegeId })))
    //   .select();
    // if (error) throw error;
    // return data;
  }
  await delay();
  return courses.map((c, i) => ({ ...c, id: `${collegeId}-course-${i}`, college_id: collegeId }));
}

/** Fetch courses for a college. */
export async function getCoursesByCollegeId(collegeId) {
  if (isSupabaseConfigured) {
    // const { data, error } = await supabase.from('college_courses').select('*').eq('college_id', collegeId);
    // if (error) throw error;
    // return data;
  }
  await delay(150);
  return [];
}

/** Delete a single course row. */
export async function deleteCourse(courseId) {
  if (isSupabaseConfigured) {
    // const { error } = await supabase.from('college_courses').delete().eq('id', courseId);
    // if (error) throw error;
  }
  await delay(150);
  return { success: true };
}
