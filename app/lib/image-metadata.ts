import exifr from 'exifr';

export async function getImageTimestamp(filePath: string): Promise<string | null> {
  try {
    const metadata = await exifr.parse(filePath);
    const timestamp = metadata?.DateTimeOriginal ?? metadata?.CreateDate ?? metadata?.ModifyDate;

    if (!timestamp) {
      return null;
    }

    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date.toISOString();
  } catch {
    return null;
  }
}
