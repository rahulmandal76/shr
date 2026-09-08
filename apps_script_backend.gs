/**
 * Google Apps Script - Exergie 2026 Registration Backend
 * ------------------------------------------------------
 * 1. Open Google Sheets -> Extensions -> Apps Script
 * 2. Paste this entire code.
 * 3. Replace YOUR_FOLDER_ID with the ID of your "Exergie2026_Payments" Drive folder.
 * 4. Ensure your active sheet is named "All Registrations" (or change SHEET_NAME).
 * 5. Click Deploy -> New Deployment -> Select "Web app".
 * 6. Set "Execute as" to "Me".
 * 7. Set "Who has access" to "Anyone".
 * 8. Copy the Web App URL and provide it to the frontend!
 */

const FOLDER_ID = "YOUR_FOLDER_ID"; // **REPLACE THIS**
const SHEET_NAME = "All Registrations";

function doPost(e) {
  try {
    // We expect a multipart/form-data payload.
    // Apps Script parses these into e.parameters for text and e.parameters (as Blob) for files if sent right,
    // but the most reliable way to handle true multipart/form-data in GAS is via e.parameter or e.postData.
    // However, when HTML forms or FormData is sent, GAS maps them to e.parameter automatically.
    
    // Extract form fields
    const fullName = e.parameter.fullName || "Unknown";
    const mobile = e.parameter.mobile || "Unknown";
    const college = e.parameter.college || "Unknown";
    const year = e.parameter.year || "Unknown";
    const branch = e.parameter.branch || "Unknown";
    const selectedEvents = e.parameter.selectedEvents || "[]";
    const totalAmount = e.parameter.totalAmount || "0";
    
    // Extract file blob
    // When FormData appends a file, it comes into GAS as a Blob in e.parameter (if simple) 
    // or we might need to access it differently depending on fetch format. 
    // Assuming standard FormData POST:
    const screenshotBlob = e.parameter.screenshot;

    // 1. Generate Registration ID
    // Format: EXE2026-XXXX
    const randomNum = Math.floor(1000 + Math.random() * 9000); 
    const registrationId = "EXE2026-" + randomNum;
    
    // ==============================
    // 📸 SCREENSHOT UPLOAD (Cloudinary Integration)
    // ==============================
    // The React frontend now handles the heavy image upload via Cloudinary.
    // It passes us a tiny, fast 'fileUrl' string instead of a massive Base64 file.
    let fileUrl = e.parameter.fileUrl || "No File Provided";

    // 3. Save to Google Sheets
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error("Sheet '" + SHEET_NAME + "' not found.");
    }
    
    // Insert row at the bottom
    // Columns: Reg ID | Full Name | Mobile | College | Year | Branch | Selected Events | Total | Screenshot Link | Timestamp
    sheet.appendRow([
      registrationId,
      fullName,
      mobile,
      college,
      year,
      branch,
      selectedEvents, // This is a JSON string
      totalAmount,
      fileUrl,
      new Date().toLocaleString()
    ]);

    return jsonResponse({
      status: "success",
      registrationId: registrationId
    });

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// ==============================
// JSON HELPER
// ==============================
function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// For testing browser GET requests
function doGet(e) {
  return ContentService.createTextOutput("Send a POST request to this URL.");
}
