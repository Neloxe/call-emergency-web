import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const filePath = path.join(process.cwd(), 'data', 'data.csv');

  try {
    const absolutePath = path.resolve(filePath);

    // Check if the file exists before attempting to delete it
    try {
      await fs.access(absolutePath);
    } catch {
      // File does not exist, return a 200 status with a message
      return res.status(200).json({ message: 'File does not exist, nothing to delete' });
    }

    await fs.unlink(absolutePath);
    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error deleting file: ${error.message}`);
      return res.status(500).json({ message: `Error deleting file: ${error.message}` });
    }
    console.error(`Error deleting file: ${String(error)}`);
    return res.status(500).json({ message: 'Unknown error occurred' });
  }
}