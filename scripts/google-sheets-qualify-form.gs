// Google Apps Script — receives qualify form submissions and logs them to this Sheet.
// Setup instructions are in the main conversation / README. Paste this whole file into
// Extensions > Apps Script for the target Google Sheet, replacing the default code.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.spend || "",
    data.roas || "",
    data.bottleneck || "",
    data.site || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ result: "success" })).setMimeType(
    ContentService.MimeType.JSON
  );
}
