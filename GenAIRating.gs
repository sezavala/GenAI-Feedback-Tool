const OPENAI_API_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

function getLatestFineTuneModel() {
  const response = UrlFetchApp.fetch("https://api.openai.com/v1/fine_tuning/jobs?limit=3", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    Logger.log("Error fetching fine-tuning jobs: " + response.getContentText());
    return null;
  }

  const fineTunedJobs = JSON.parse(response.getContentText()).data.filter(job => job.fine_tuned_model);
  return fineTunedJobs.length > 0 ? fineTunedJobs[0].fine_tuned_model : null;
}

function rateSubmission(submission, dataTemplate, feedback, rubric, model) {
  const system_content = `You are grading the blog writing process of Computer Science students during their Open-Source Experience. Use the rubric to guide feedback. Rubric: ${rubric}. Provide direct feedback to students.`;

  for (let sheetName in submission) {
    Logger.log(`Grading ${sheetName}`);
    const sheetData = submission[sheetName];

    for (let studentId in sheetData) {
      const studentText = sheetData[studentId];
      if (!studentText || studentText.trim() === "" || studentText === "No valid submission") {
        Logger.log(`Skipping ${studentId} — unsubmitted or missing`);
        continue;
      }

      // Clone a fresh default data structure per student
      const studentData = JSON.parse(JSON.stringify(dataTemplate));

      for (let section in studentData) {
        let fullPrompt;
        const isScore = section.endsWith("Score");
        const isFeedback = section.startsWith("Sec");

        if (isFeedback) {
          fullPrompt = `${feedback[section]}
Student Work: ${studentText}
Respond ONLY with plain English sentences. Do NOT use JSON, do NOT number the sentences, and do NOT include extra formatting or Markdown.`;
        } else if (isScore) {
          fullPrompt = `Student Work: ${studentText} 
Based on the feedback you gave the student here: ${JSON.stringify(studentData, null, 2)}
Provide ONLY ONE overall score on how the student performed.
Score range: ${feedback[section]}
Now reply ONLY in this format (no explanation): { "Score": <number> }.`;
        } else {
          fullPrompt = `Student Work: ${studentText}\n\nTake a look at the feedback the student received: ${JSON.stringify(studentData, null, 2)}\n\nProvide overall feedback on how the student did, 4-5 sentences ONLY. Respond ONLY with plain English sentences. Do NOT use JSON, do NOT number the sentences, and do NOT include extra formatting or Markdown.`;
        }

        const payload = {
          model: model,
          messages: [
            { role: "system", content: system_content },
            { role: "user", content: fullPrompt }
          ]
        };

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
          Logger.log(`Error for ${studentId} in ${sheetName}, section ${section}: ` + chatResponse.getContentText());
          studentData[section] = "Error generating feedback";
          continue;
        }

        const responseJson = JSON.parse(chatResponse.getContentText());
        const response = responseJson.choices[0].message.content.trim();

        if (isScore) {
          try {
            const parsed = JSON.parse(response);
            const score = parseInt(parsed["Score"]);
            if (Number.isInteger(score) && score >= 1 && score <= 5) {
              studentData[section] = score;
            } else {
              studentData[section] = "Invalid score format";
            }
          } catch (err) {
            studentData[section] = "Invalid score format";
          }
        } else {
          studentData[section] = response.replace(/\n/g, ' ');
        }
      }

      // Store per-student data in submission
      submission[sheetName][studentId] = studentData;

      // Write into sheet
      gradeSubmission(sheetName, submission[sheetName], studentId);
      Logger.log(`Graded ${studentId}`);
    }
  }
}


function gradeSubmission(sheetName, data, studentId) {
  const feedback = data[studentId];
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const values = sheet.getDataRange().getValues();
  const canvasIdCol = values[0].indexOf('Canvas ID');

  for (let row = 1; row < values.length; row++) {
    const canvasId = values[row][canvasIdCol];
    if (canvasId == studentId) {
      for (let key in feedback) {
        const col = values[0].indexOf(key);
        if (col !== -1) {
          values[row][col] = feedback[key];
        } else {
          Logger.log(`Column "${key}" not found in sheet "${sheetName}".`);
        }
      }
      break;
    }
  }

  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
}
