// Google Apps Script - Exergie 2026 Registration Backend (Updated with Email & Dynamic Team Members)

// REPLACE this with your actual folder ID where screenshots should be saved
const TARGET_FOLDER_ID = "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE";

function doPost(e) {
  try {
    // 1. Get lock to prevent race conditions
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); 

    // 2. Parse basic fields
    const fullName = e.parameter.fullName ||"";
    const email = e.parameter.email || ""; // New field
    const mobile = e.parameter.mobile ||"";
    const college = e.parameter.college ||"";
    const year = e.parameter.year ||"";
    const branch = e.parameter.branch ||"";
    const totalAmount = e.parameter.totalAmount || "0";
    
    // 3. Parse JSON structures
    let selectedEvents = [];
    try {
      selectedEvents = JSON.parse(e.parameter.selectedEvents || "[]");
    } catch (err) {}

    let teamMembers = {};
    try {
      teamMembers = JSON.parse(e.parameter.teamMembers || "{}");
    } catch (err) {}

    // 4. Handle Screenshot Upload
    let fileUrl = "No File";
    if (e.parameter.screenshotBase64) {
      const decodedData = Utilities.base64Decode(e.parameter.screenshotBase64);
      const blob = Utilities.newBlob(decodedData, e.parameter.screenshotMimeType, e.parameter.screenshotName);
      
      const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
      const file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // 5. Generate Registration ID
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let masterSheet = ss.getSheetByName("All Registrations");
    
    // Create master sheet if it doesn't exist
    if (!masterSheet) {
      masterSheet = ss.insertSheet("All Registrations");
      masterSheet.appendRow(["Timestamp", "Registration ID", "Full Name", "Email", "Mobile", "College", "Year", "Branch", "Selected Events", "Team Extra Members Map", "Total Amount (₹)", "Payment Screenshot"]);
    }
    
    const count = Math.max(0, masterSheet.getLastRow() - 1);
    const paddedCount = (count + 1).toString().padStart(4, '0');
    const registrationId = "EXE2026-" + paddedCount;

    const timestamp = new Date();

    // 6. Log to Master Sheet
    masterSheet.appendRow([
      timestamp, 
      registrationId, 
      fullName, 
      email,
      mobile, 
      college, 
      year, 
      branch, 
      selectedEvents.join(", "), 
      JSON.stringify(teamMembers), // Store the raw map
      totalAmount, 
      fileUrl
    ]);

    // 7. Distribute to Individual Event Sheets
    selectedEvents.forEach(eventName => {
      let eventSheet = ss.getSheetByName(eventName);
      if (!eventSheet) {
        // Create specific sheet if missing
        eventSheet = ss.insertSheet(eventName);
        eventSheet.appendRow(["Timestamp", "Registration ID", "Leader Name", "Leader Email", "Mobile", "College", "Team Status / Extra Members", "Payment Screenshot"]);
      }

      // Determine if there are extra members for this specific event
      const membersArray = teamMembers[eventName];
      let teamString = "Individual";
      
      if (membersArray && membersArray.length > 0) {
          teamString = "Team Members: " + membersArray.join(", ");
      }

      eventSheet.appendRow([
        timestamp, 
        registrationId, 
        fullName, 
        email,
        mobile, 
        college, 
        teamString, 
        fileUrl
      ]);
    });

    lock.releaseLock();

    // 8. Return Success to React
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      registrationId: registrationId 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
