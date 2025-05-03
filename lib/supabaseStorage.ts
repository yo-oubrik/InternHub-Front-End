import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role key for authenticated access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

interface UploadFileOptions {
  bucketName: string;
  fileName: string;
}

/**
 * Uploads a file to Supabase storage and returns its public URL
 * @param file - The file object to upload
 * @param options - Upload options including bucket name and file name
 * @returns Promise containing the public URL of the uploaded file
 * @throws Error if upload fails
 */
export async function uploadFileToSupabase(
  file: File,
  options: UploadFileOptions
): Promise<string> {
  try {
    // Convert file to ArrayBuffer
    const fileBuffer = await file.arrayBuffer();

    // Generate a unique file name with timestamp to prevent collisions
    const uniqueFileName = options.fileName;

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from(options.bucketName)
      .upload(uniqueFileName, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Get public URL
    const publicUrl = supabase.storage
      .from(options.bucketName)
      .getPublicUrl(uniqueFileName);

    return publicUrl.data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

/**
 * Deletes a file from Supabase storage
 * @param bucketName - The name of the bucket
 * @param fileName - The name of the file to delete
 * @returns Promise that resolves when file is deleted
 * @throws Error if deletion fails
 */
export async function deleteFileFromSupabase(
  bucketName: string,
  fileName: string
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([fileName]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
