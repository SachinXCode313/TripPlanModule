import { google } from 'googleapis'
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();


//To Connect Node.js to Google Sheet

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.CREADS,
    scopes: "https://www.googleapis.com/auth/spreadsheets"
})
const client = await auth.getClient()
const googleSheets = google.sheets({ version: "v4", auth: client })
const spreadsheetId = process.env.GOOGLE_SHEET_ID
console.log("Spreadsheet is live ...")

export { auth, spreadsheetId, googleSheets };