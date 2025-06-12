const CANVAS_API_TOKEN = PropertiesService.getScriptProperties().getProperty('CANVAS_API_TOKEN');

function getNewSubmissions(courseId, assignmentId, sheetName, checkpoint1) {
  const headers = { Authorization: 'Bearer ' + CANVAS_API_TOKEN };
  const baseUrl = `https://cti-courses.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?include[]=submission_history&per_page=100`;
  const allSubmissions = fetchAllPaginated(baseUrl, headers);

  const canvasIds = getCanvasIdsFromSheet(sheetName);
  const docUrlMap = checkpoint1 ? null : buildDocUrlMap(sheetName);

  const data = {};
  data[sheetName] = {};

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetObj = ss.getSheetByName(sheetName);
  const values = sheetObj.getDataRange().getValues();
  const canvasIdCol = values[0].indexOf('Canvas ID');
  const urlCol = values[0].indexOf('Blog Link');
  const idsSet = new Set(canvasIds.map(id => String(parseInt(id, 10))));

  for (const submission of allSubmissions) {
    const id = submission.user_id.toString();
    if (!idsSet.has(id)) continue;
    if (submission.workflow_state === 'unsubmitted') continue;

    try {
      let docUrl = "";
      let fullUrl = "";
      let docResponse;

      if (checkpoint1) {
        const text = submission.submission_history?.[0]?.submission_data?.[0]?.text;
        const match = text?.match(/https:\/\/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]{20,})/);
        const docId = match?.[1];
        if (!docId) {
          Logger.log(`Invalid or missing doc link in submission text for user ${id}`);
          continue;
        }

        fullUrl = `https://docs.google.com/document/d/${docId}`;
        docUrl = `${fullUrl}/export?format=txt`;

        docResponse = UrlFetchApp.fetch(docUrl);  // no header for public export links

        if (docResponse.getResponseCode() === 200) {
          for (let i = 1; i < values.length; i++) {
            const studentId = String(parseInt(values[i][canvasIdCol], 10));
            if (studentId === id && !values[i][urlCol]) {
              sheetObj.getRange(i + 1, urlCol + 1).setValue(fullUrl);
              break;
            }
          }
        } else {
          continue;
        }

      } else {
        fullUrl = docUrlMap[id];
        if (!fullUrl) continue;

        const docId = fullUrl.split("/d/")[1]?.split("/")[0];
        if (!docId) continue;

        docUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`;

        docResponse = UrlFetchApp.fetch(docUrl);

        if (docResponse.getResponseCode() !== 200) continue;
      }

      const cleaned = docResponse.getContentText()
        .replace(/\r\n/g, '\n')
        .replace(/\n{2,}/g, '\n\n');

      Logger.log(`Fetched submission from student ID: ${id}`);
      data[sheetName][id] = cleaned;

    } catch (err) {
      Logger.log(`Error processing user ${id} in sheet ${sheetName}: ${err}`);
      continue;
    }
  }

  return data;
}

function getCanvasIdsFromSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName(sheetName);
  const values = ws.getDataRange().getValues();
  const canvasIdCol = values[0].indexOf('Canvas ID');
  return values.slice(1).map(row => row[canvasIdCol]).filter(Boolean);
}

function buildDocUrlMap(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName(sheetName);
  const values = ws.getDataRange().getValues();
  const canvasIdCol = values[0].indexOf('Canvas ID');
  const urlCol = values[0].indexOf('Blog Link');

  const docMap = {};
  for (let i = 1; i < values.length; i++) {
    const id = String(parseInt(values[i][canvasIdCol], 10));
    const url = values[i][urlCol];
    if (id && url) {
      docMap[id] = url;
    }
  }
  return docMap;
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
