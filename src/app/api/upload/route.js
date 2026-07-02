import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Google Drive credentials from environment variables
    const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
    // Replace literal \n with actual newlines for the private key
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_DRIVE_FOLDER_ID) {
      console.error("Missing Google Drive environment variables.");
      return NextResponse.json(
        { error: 'Server configuration error: Missing Google Drive credentials.' },
        { status: 500 }
      );
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: GOOGLE_CLIENT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });
    
    // Convert Web File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileMetadata = {
      name: file.name || `Upload_${Date.now()}`,
      parents: [GOOGLE_DRIVE_FOLDER_ID],
    };

    // We can use a PassThrough stream or just Readable.from
    const { Readable } = require('stream');
    const media = {
      mimeType: file.type || 'image/jpeg',
      body: Readable.from(buffer),
    };

    const driveResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    // Make the file publicly accessible so the frontend image tag can display it
    await drive.permissions.create({
      fileId: driveResponse.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // The export=view URL is often better for <img> tags
    const directImageUrl = `https://drive.google.com/uc?export=view&id=${driveResponse.data.id}`;

    return NextResponse.json({
      success: true,
      fileId: driveResponse.data.id,
      webViewLink: driveResponse.data.webViewLink,
      webContentLink: driveResponse.data.webContentLink,
      directImageUrl: directImageUrl
    });

  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    return NextResponse.json({ error: 'Failed to upload file to Google Drive.' }, { status: 500 });
  }
}
