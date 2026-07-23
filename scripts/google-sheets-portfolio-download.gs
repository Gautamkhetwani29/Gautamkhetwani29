// Google Apps Script — receives portfolio-download gate submissions and logs
// them to this Sheet. Paste this whole file into Extensions > Apps Script
// for the target Google Sheet, replacing the default code. Use a separate
// Sheet from the qualify-form one so the two lead sources stay distinct.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.phone || "",
    data.profession || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(
    ContentService.MimeType.JSON
  );
}
