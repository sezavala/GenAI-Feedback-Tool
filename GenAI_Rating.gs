function fineTuneModel() {
  const baseModel = "gpt-3.5-turbo";
  const fileContent = getTrainingFileContent();
  const uploadUrl = "https://api.openai.com/v1/files";

  const uploadOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + OPENAI_API_KEY
    },
    payload: {
      purpose: "fine-tune",
      file: Utilities.newBlob(fileContent, "application/json", "prompt.json")
    },
    muteHttpExceptions: true
  };

  const uploadResponse = UrlFetchApp.fetch(uploadUrl, uploadOptions);

  if (uploadResponse.getResponseCode() !== 200) {
    Logger.log("Error uploading training file: " + uploadResponse.getContentText());
    return;
  }

  const uploadData = JSON.parse(uploadResponse.getContentText());
  const trainingFileId = uploadData.id;
  Logger.log("📄 Training file uploaded. File ID: " + trainingFileId);

  const fineTuneUrl = "https://api.openai.com/v1/fine_tuning/jobs";

  const fineTunePayload = {
    training_file: trainingFileId,
    model: baseModel
  };

  const fineTuneResponse = UrlFetchApp.fetch(
    fineTuneUrl,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify(fineTunePayload),
      muteHttpExceptions: true
    }
  );

  if (fineTuneResponse.getResponseCode() !== 200) {
    Logger.log("Error creating fine-tuning job: " + fineTuneResponse.getContentText());
    return;
  }

  const fineTuneData = JSON.parse(fineTuneResponse.getContentText());
  Logger.log("Fine-tuning job created successfully:");
  Logger.log(JSON.stringify(fineTuneData, null, 2));
}

function getTrainingFileContent() {
  const trainingData = [
    {
      messages: [
        { role: "system", content: "You are a helpful grader." },
        { role: "user", content: "Blog: How I contributed to open-source." },
        { role: "assistant", content: "Excellent effort with clear technical detail." }
      ]
    },
    {
      messages: [
        { role: "user", content: "Blog: My experience fixing bugs." },
        { role: "assistant", content: "Great clarity, needs slightly more technical depth." }
      ]
    }
  ];
  return JSON.stringify(trainingData);
}

function rateSubmission(submission, format, rubric) {
  const system_content = "You are grading the blog process of Computer Science students during their Summer Open-Source Experience. Provide feedback to the student.";

  const fineTuningResponse = UrlFetchApp.fetch(
    "https://api.openai.com/v1/fine_tuning/jobs?limit=3",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      muteHttpExceptions: true
    }
  );

  if (fineTuningResponse.getResponseCode() !== 200) {
    Logger.log("Error fetching fine-tuning jobs: " + fineTuningResponse.getContentText());
    return null;
  }

  const fineTuningData = JSON.parse(fineTuningResponse.getContentText());
  const fineTunedJobs = fineTuningData.data.filter(job => job.fine_tuned_model);
  if (fineTunedJobs.length === 0) {
    Logger.log("No completed fine-tuning jobs with a usable model found.");
    return null;
  }

  const fineTuneModel = fineTunedJobs[0].fine_tuned_model;

  for (let sheetName in submission) {
    const sheetData = submission[sheetName];

    for (let studentId in sheetData) {
      const studentText = sheetData[studentId];

      const formatPrompt = `Please return your response as a single valid JSON object. Use only double quotes. Do not wrap the entire JSON in a string. Use this structure:\n${format}`;
      const prompt = `Assess the student's work and provide feedback for each sub-section using the following rubric:\n${rubric}\n\nStudent Work:\n${studentText}`;

      const payload = {
        model: fineTuneModel,
        messages: [
          { role: "system", content: system_content },
          { role: "user", content: formatPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.3
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

      const chatData = JSON.parse(chatResponse.getContentText());
      const feedbackRaw = chatData.choices[0].message.content;

      try {
        const parsed = JSON.parse(feedbackRaw);
        sheetData[studentId] = parsed;
        gradeSubmission(sheetName, sheetData, studentId);
      } catch (err) {
        Logger.log(`Failed to parse GPT feedback for ${studentId} in ${sheetName}`);
        Logger.log("Raw output: " + feedbackRaw);
        sheetData[studentId] = feedbackRaw; // fallback
      }
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
    // Skip feedback sections (sec_1_A, sec_2_B, etc.)
    if (key.startsWith("sec_")) {
      continue;
    }
    if(key.endsWith("Score")){
      for (let row = 1; row < data.length; row++) {
        const canvasId = data[row][canvasIdCol];
        if (canvasId == studentId) {
          const headerCol = data[0].indexOf(key);
          if (headerCol !== -1) {
            data[row][headerCol] = feedback[key];
          } else {
            Logger.log(`⚠️ Column "${key}" not found in sheet "${sheetName}".`);
          }
          break;
        }
      }
    }
  }

  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
}
