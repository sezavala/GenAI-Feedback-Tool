function getNewSubmissions(courseId, assignmentId, sheetNames, checkpoint1) {
  const headers = { Authorization: 'Bearer ' + CANVAS_API_TOKEN };
  const baseUrl = `https://cti-courses.instructure.com/api/v1/courses/${courseId}/assignments/${assignmentId}/submissions?include[]=submission_history&per_page=100`;
  const allSubmissions = fetchAllPaginated(baseUrl, headers);
  const canvasIdsPerSheet = getCanvasIdsFromSheets(sheetNames);
  let docUrlMaps = null;
  if (!checkpoint1) {
    docUrlMaps = buildDocUrlMaps(sheetNames);
  }

  const data = {};
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  for (let sheet of sheetNames) {
    const sheetObj = ss.getSheetByName(sheet);
    const values = sheetObj.getDataRange().getValues();
    const canvasIdCol = values[0].indexOf('Canvas ID');
    const urlCol = values[0].indexOf('Blog Link');

    const idsArray = canvasIdsPerSheet[sheet];
    const idsSet = new Set(idsArray.map(id => String(parseInt(id, 10))));
    const docUrlMap = checkpoint1 ? null : docUrlMaps[sheet];
    data[sheet] = {};

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

          docResponse = UrlFetchApp.fetch(docUrl)

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

          docResponse = UrlFetchApp.fetch(docUrl, {
            headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }
          });

          if (docResponse.getResponseCode() !== 200) continue;
        }

        const cleaned = docResponse.getContentText()
          .replace(/\r\n/g, '\n')
          .replace(/\n{2,}/g, '\n\n');
        
        Logger.log(`Fetched submission from student ID: ${id}`);
        data[sheet][id] = cleaned;

      } catch (err) {
        Logger.log(`Error processing user ${id} in sheet ${sheet}: ${err}`);
        continue;
      }
    }
  }

  return data;
}

function getCanvasIdsFromSheets(sheetNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const map = {};

  for (let sheetName of sheetNames) {
    const ws = ss.getSheetByName(sheetName);
    const values = ws.getDataRange().getValues();
    const canvasIdCol = values[0].indexOf('Canvas ID');
    const ids = values.slice(1).map(row => row[canvasIdCol]).filter(Boolean);
    map[sheetName] = ids;
  }

  return map;
}

function buildDocUrlMaps(sheetNames) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const maps = {};

  for (let sheetName of sheetNames) {
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
    maps[sheetName] = docMap;
  }

  return maps;
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
