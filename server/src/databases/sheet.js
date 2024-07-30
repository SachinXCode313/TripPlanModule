import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const initializeGoogleSheets = async () => {
  try {
    // Resolve the path to the credentials file
    const credsPath = path.resolve(process.cwd(), process.env.CREADS);

    // Ensure the credentials file exists
    if (!fs.existsSync(credsPath)) {
      throw new Error(`Credentials file not found at path: ${credsPath}`);
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: credsPath,
      scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    console.log("Spreadsheet is live ...");

    return { auth, spreadsheetId, googleSheets };
  } catch (error) {
    console.error("Error initializing Google Sheets:", error);
    throw error; // Optionally rethrow the error if you want to handle it further up the call stack
  }
};

// Exporting the initialization function
export default initializeGoogleSheets;
