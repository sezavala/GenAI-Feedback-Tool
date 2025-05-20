function rateSubmission(submission, data, feedback, rubric) {
  const system_content = `You are grading the blog writing process of Computer Science students during their Summer Open-Source Experience. Use the rubric to guide feedback. Rubric: ${rubric}. Provide direct feedback to students.`;

  const fineTuningResponse = UrlFetchApp.fetch("https://api.openai.com/v1/fine_tuning/jobs?limit=3", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    muteHttpExceptions: true
  });

  if (fineTuningResponse.getResponseCode() !== 200) {
    Logger.log("Error fetching fine-tuning jobs: " + fineTuningResponse.getContentText());
    return;
  }

  const fineTunedJobs = JSON.parse(fineTuningResponse.getContentText()).data.filter(job => job.fine_tuned_model);
  if (fineTunedJobs.length === 0) {
    Logger.log("No fine-tuned models available.");
    return;
  }

  const fineTuneModel = fineTunedJobs[0].fine_tuned_model;

  for (let sheetName in submission) {
    const sheetData = submission[sheetName];
    for (let studentId in sheetData) {
      const studentText = sheetData[studentId];
      let fullPrompt;
      for(let section in feedback){
        if(section.startsWith("sec")){
          let prompt = feedback[section];
          fullPrompt = `${prompt}\n\nStudent Work:\n${studentText}
          Respond ONLY with plain English sentences. Do NOT use JSON, do NOT number the sentences, and do NOT include extra formatting or Markdown.
`;

          const payload = {
            model: fineTuneModel,
            messages: [
              { role: "system", content: system_content },
              { role: "user", content: fullPrompt }
            ]
          };

          const chatResponse = UrlFetchApp.fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + OPENAI_API_KEY,
                "Content-Type": "application/json"
              },
              payload: JSON.stringify(payload),
              muteHttpExceptions: true
            }
          );

          if (chatResponse.getResponseCode() !== 200) {
            Logger.log(`Error for ${studentId} in ${sheetName}: ` + chatResponse.getContentText());
            sheetData[studentId] = "Error generating feedback";
            continue;
          }

          const responseJson = JSON.parse(chatResponse.getContentText());
          const response = responseJson.choices[0].message.content.trim().replace(/\n/g, '');          
          data[section] = response;
        } else if(section.endsWith("Score")){
          fullPrompt = `Student Work: ${studentText} 
          Rate how the student followed each section of this rubric, then average the score: ${JSON.stringify(feedback, null, 2)} 
          Score range: ${feedback[section]} 
          Grade Strictly if needed.
          Respond ONLY in this format (no explanation): { "Score": <number> } 
          Example: { "Score": 5 } Now provide the score.`;

          const payload = {
            model: fineTuneModel,
            messages: [
              { role: "system", content: system_content },
              { role: "user", content: fullPrompt }
            ]
          };

          const chatResponse = UrlFetchApp.fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + OPENAI_API_KEY,
                "Content-Type": "application/json"
              },
              payload: JSON.stringify(payload),
              muteHttpExceptions: true
            }
          );

          if (chatResponse.getResponseCode() !== 200) {
            Logger.log(`Error for ${studentId} in ${sheetName}: ` + chatResponse.getContentText());
            sheetData[studentId] = "Error generating feedback";
            continue;
          }

          const responseJson = JSON.parse(chatResponse.getContentText());
          const response = responseJson.choices[0].message.content.trim().replace(/\n/g, '');          
          const match = response.match(/"Score"\s*:\s*(\d+)/);
          if (match && match[1]) {
            data[section] = parseInt(match[1]);
          } else {
            Logger.log(`Failed to parse score from response: ${response}`);
            data[section] = "Invalid score format";
}

        } else{
          fullPrompt = `Student Work: ${studentText}\n\nTake a look at how the feedback the student recieved: ${JSON.stringify(data, null, 2)}\n\nProvide overall feedback on how the student did, 4-5 sentences. Respond ONLY with plain English sentences. Do NOT use JSON, do NOT number the sentences, and do NOT include extra formatting or Markdown.`;
          
          const payload = {
            model: fineTuneModel,
            messages: [
              { role: "system", content: system_content },
              { role: "user", content: fullPrompt }
          ]};
        
          const chatResponse = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + OPENAI_API_KEY,
              "Content-Type": "application/json"
            },
            payload: JSON.stringify(payload),
            muteHttpExceptions: true
          });

          if (chatResponse.getResponseCode() !== 200) {
            Logger.log(`Error for ${studentId} in ${sheetName}: ` + chatResponse.getContentText());
            sheetData[studentId] = "Error generating feedback";
            continue;
          }

          const responseJson = JSON.parse(chatResponse.getContentText());
          const response = responseJson.choices[0].message.content.trim().replace(/\n/g, '');          
          data[section] = response;
        }
      }
      submission[sheetName][studentId] = data;
      console.log(submission[sheetName][studentId])
      gradeSubmission(sheetName, sheetData, studentId);
      Logger.log(`Graded ${studentId}`)
    }
  }
}

function gradeSubmission(sheetName, sheetData, studentId) {
  const feedback = sheetData[studentId];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  const canvasIdCol = data[0].indexOf('Canvas ID');

  for (let key in feedback) {
    if (key.startsWith("sec_")) {
      continue;
    } else if(key.endsWith("Score")){
      for (let row = 1; row < data.length; row++) {
        const canvasId = data[row][canvasIdCol];
        if (canvasId == studentId) {
          const headerCol = data[0].indexOf(key);
          if (headerCol !== -1) {
            data[row][headerCol] = feedback[key];
          } else {
            Logger.log(`Column "${key}" not found in sheet "${sheetName}".`);
          }
          break;
        }
      }
    } else if(key.endsWith("Feedback")) {
      for (let row = 1; row < data.length; row++) {
        const canvasId = data[row][canvasIdCol];
        if (canvasId == studentId) {
          const headerCol = data[0].indexOf(key);
          if (headerCol !== -1) {
            data[row][headerCol] = feedback[key];
          } else {
            Logger.log(`Column "${key}" not found in sheet "${sheetName}".`);
          }
          break;
        }
      }
    }
  }

  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
