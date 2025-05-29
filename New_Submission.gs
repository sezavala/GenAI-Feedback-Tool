function getNewSubmissions(courseId, assignmentId) {
  const headers = { Authorization: 'Bearer ' + CANVAS_API_TOKEN };
  const baseUrl = `https://cti-courses.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?include[]=submission_history&per_page=100`;
  
  const allSubmissions = fetchAllPaginated(baseUrl, headers);
  const canvasIdsPerSheet = getCanvasIdsFromSheets();
  const data = {};

  for (let sheet in canvasIdsPerSheet) {
    const idsArray = canvasIdsPerSheet[sheet];
    const ids = new Set(canvasIdsPerSheet[sheet].map(id => String(parseInt(id, 10))));
    data[sheet] = {};
    for (const submission of allSubmissions) {
      const id = submission.user_id;
      if (!ids.has(id.toString())) continue;
      if (submission.workflow_state === 'unsubmitted' || submission.workflow_state === 'graded') continue;

      try {
        const text = submission.submission_history?.[0]?.submission_data?.[0]?.text;
        const match = text?.match(/https:\/\/docs\.google\.com\/document\/d\/[^\s"<>]+/);
        if (!match) continue;

        const docId = match[0].split("/d/")[1].split("/")[0];
        const docUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;
        const docResponse = UrlFetchApp.fetch(docUrl);
        if (docResponse.getResponseCode() !== 200) continue;

        const cleaned = docResponse.getContentText().replace(/\r\n/g, '\n').replace(/\n{2,}/g, '\n\n');
        data[sheet][id] = cleaned;

      } catch (err) {
        continue;
      }
    }
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

function fetchAllPaginated(url, headers) {
  let results = [];
  while (url) {
    const response = UrlFetchApp.fetch(url, { headers });
    if (response.getResponseCode() !== 200) break;

    results = results.concat(JSON.parse(response.getContentText()));
    const linkHeader = response.getHeaders()['Link'];
    const nextMatch = linkHeader && linkHeader.match(/<([^>]+)>;\s*rel="next"/);
    url = nextMatch ? nextMatch[1] : null;
  }
  return results;
}


function getCanvasIdsFromSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = ['Micro-Internship A', 'Micro-Internship B', 'Micro-Internship C', 'Micro-Internship D', 'Micro-Internship E'];
  const map = {};

  for (let name of sheetNames) {
    const ws = ss.getSheetByName(name);
    const values = ws.getDataRange().getValues();
    const col = values[0].indexOf('Canvas ID');
    const ids = values.slice(1).map(row => row[col]).filter(Boolean);
    map[name] = ids;
  }

  return map;
}
