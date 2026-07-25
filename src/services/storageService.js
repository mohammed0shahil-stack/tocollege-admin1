import { supabase, isSupabaseConfigured } from './supabase';

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// In dev (no Supabase yet), we return a local object URL so previews still
// work end-to-end in the UI. Real uploads replace this with a public Storage URL.
function mockUploadResult(file) {
  return { path: `mock/${Date.now()}-${file.name}`, publicUrl: URL.createObjectURL(file) };
}

/**
 * Real implementation for every upload* function below follows this shape:
 *   const path = `${bucket}/${collegeId}/${Date.now()}-${file.name}`;
 *   const { error } = await supabase.storage.from(bucket).upload(path, file);
 *   if (error) throw error;
 *   const { data } = supabase.storage.from(bucket).getPublicUrl(path);
 *   return { path, publicUrl: data.publicUrl };
 */

export async function uploadLogo(collegeId, file) {
  if (isSupabaseConfigured) {
    // const path = `logos/${collegeId}/${Date.now()}-${file.name}`;
    // const { error } = await supabase.storage.from('college-logos').upload(path, file);
    // if (error) throw error;
    // const { data } = supabase.storage.from('college-logos').getPublicUrl(path);
    // return { path, publicUrl: data.publicUrl };
  }
  await delay();
  return mockUploadResult(file);
}

export async function uploadCover(collegeId, file) {
  if (isSupabaseConfigured) {
    // const path = `covers/${collegeId}/${Date.now()}-${file.name}`;
    // const { error } = await supabase.storage.from('college-covers').upload(path, file);
    // if (error) throw error;
    // const { data } = supabase.storage.from('college-covers').getPublicUrl(path);
    // return { path, publicUrl: data.publicUrl };
  }
  await delay();
  return mockUploadResult(file);
}

/** Uploads multiple gallery files in parallel and returns their upload results in order. */
export async function uploadGallery(collegeId, files) {
  if (isSupabaseConfigured) {
    // return Promise.all(files.map((file, i) => {
    //   const path = `gallery/${collegeId}/${Date.now()}-${i}-${file.name}`;
    //   return supabase.storage.from('college-gallery').upload(path, file)
    //     .then(({ error }) => {
    //       if (error) throw error;
    //       const { data } = supabase.storage.from('college-gallery').getPublicUrl(path);
    //       return { path, publicUrl: data.publicUrl };
    //     });
    // }));
  }
  await delay(600);
  return files.map(mockUploadResult);
}

export async function uploadBrochure(collegeId, file) {
  if (isSupabaseConfigured) {
    // const path = `brochures/${collegeId}/${Date.now()}-${file.name}`;
    // const { error } = await supabase.storage.from('college-brochures').upload(path, file);
    // if (error) throw error;
    // const { data } = supabase.storage.from('college-brochures').getPublicUrl(path);
    // return { path, publicUrl: data.publicUrl };
  }
  await delay();
  return mockUploadResult(file);
}
