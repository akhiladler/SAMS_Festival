import { apiRequest } from './queryClient';

export interface FileMetadata {
  id?: number; // Optional for creation, will be auto-assigned by the server
  title: string;
  filename: string;
  size: string;
  type: string;
  uploadedAt: string;
}

/**
 * Saves file metadata to the server
 */
export async function saveFileMetadata(metadata: FileMetadata): Promise<FileMetadata> {
  const response = await fetch('/api/file-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save file metadata');
  }
  
  return response.json();
}

/**
 * Formats the size of a file into a human-readable string
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' B';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + 'KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
}

/**
 * Extracts the file extension from a filename
 */
export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  return parts.length > 1 ? '.' + parts[parts.length - 1].toLowerCase() : '';
}

/**
 * Formats a date into a readable string
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Generates a unique ID for file metadata
 */
export function generateUniqueId(): string {
  return Date.now().toString() + '_' + Math.random().toString(36).substring(2, 9);
}