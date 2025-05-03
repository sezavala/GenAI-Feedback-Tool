function getNewSubmissions(courseId, assignmentId) {
  const data = {};

  const sheet_ids = [];
  const sheetNames = ['Micro-Internship A', 'Micro-Internship B', 'Micro-Internship C', 'Micro-Internship D', 'Micro-Internship E'];
  const canvasBaseUrl = 'https://cti-courses.instructure.com/api/v1/';

  const headers = {
    'Authorization': 'Bearer ' + CANVAS_API_TOKEN
  };

  for (let sheet of sheetNames) {
    sheet_ids.push(process_sheet(sheet));
    break;
  }
  
  for (let [index, sheetData] of sheet_ids.entries()) {
    const ids = sheetData[sheetNames[index]];
    const submission = {};
    
    for (let id of ids) {
      const canvasApiUrl = `${canvasBaseUrl}courses/${courseId}/assignments/${assignmentId}/submissions/${id}?include[]=submission_history`;
      
      const response = UrlFetchApp.fetch(canvasApiUrl, {
        'headers': headers,
        'muteHttpExceptions': true
      });

      if (response.getResponseCode() === 200) {
        const assignment = JSON.parse(response.getContentText());
        if (assignment.workflow_state !== 'unsubmitted') {
          try {
            const text = assignment.submission_history[0].submission_data[0].text;
            const regex = /https:\/\/docs\.google\.com\/document\/d\/[^\s"<>]+/;
            const match = text.match(regex);

            if (match) {
              const url = match[0];
              const doc_id = url.split("/d/")[1].split("/")[0];
              const export_url = `https://docs.google.com/document/d/${doc_id}/export?format=txt`;
              const doc_text_response = UrlFetchApp.fetch(export_url);

              if (doc_text_response.getResponseCode() === 200) {
                let cleaned_text = doc_text_response.getContentText().replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n\n');
                submission[id] = cleaned_text; 
                break;
              } else {
                Logger.log(`Error fetching doc for ID ${id}: ${export_url}`);
              }
            } else {
              Logger.log(`No Google Doc URL found for ID ${id}`);
            }
          } catch (error) {
            Logger.log(`Error processing submission for ID ${id}: ${error}`);
          }
        }
      } else {
        Logger.log(`Error fetching submission for ID ${id}: ${response.getContentText()}`);
      }
    }

    data[sheetNames[index]] = submission;
  }

  return data;
}

function process_sheet(sheet){
  var dict = {};
  var student_ids = [];
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var active_worksheet = ss.getSheetByName(sheet);
  var data_worksheet = active_worksheet.getDataRange().getValues();
  var canvas_id_col = data_worksheet[0].indexOf('Canvas ID');

  for(var student_row = 1; student_row < data_worksheet.length; student_row++) {
    var canvas_id = data_worksheet[student_row][canvas_id_col];
    if(canvas_id == ""){
      break;
    }
    student_ids.push(canvas_id)
  }

  dict[sheet] = student_ids;
  return dict;
}
