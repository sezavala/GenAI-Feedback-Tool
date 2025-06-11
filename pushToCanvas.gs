// Unable to test if this function worked
// {"status":"unauthorized","errors":[{"message":"user not authorized to perform that action"}]}

function pushToCanvas(data, courseId, assignmentId) {
  const canvasBaseUrl = 'https://cti-courses.instructure.com/api/v1/';

  for (let sheetName in data) {
    const sheetData = data[sheetName];
    for (let studentId in sheetData) {
      const gradeJSON = sheetData[studentId];
      let comment = "";
      let grade = 0;

      for (let section in gradeJSON) {
        if (section.startsWith("sec")) {
          comment += `${section}: ${gradeJSON[section]}\n\n`;
        } else if (section.endsWith("Score")) {
          const parsedScore = parseInt(gradeJSON[section]);
          grade = (Number.isInteger(parsedScore) && parsedScore >= 1 && parsedScore <= 5) ? parsedScore : 5;
        }
      }

      const fullUrl = `${canvasBaseUrl}courses/${courseId}/assignments/${assignmentId}/submissions?student_id=${studentId}`;

      const params = {
        "submission[posted_grade]": grade.toString(),
        "comment[text_comment]": comment
      };

      const options = {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + CANVAS_API_TOKEN
        },
        payload: params,
        muteHttpExceptions: true
      };


      try {
        const response = UrlFetchApp.fetch(fullUrl, options);
        const statusCode = response.getResponseCode();

        if (statusCode !== 200) {
          Logger.log(`Failed to update student ${studentId}. HTTP Status: ${statusCode}`);
          Logger.log(response.getContentText());
        } else {
          Logger.log(`Successfully updated student ${studentId}`);
          Logger.log(`Comment:\n${comment}`);
          Logger.log(`Full URL: ${fullUrl}`);
        }
      } catch (error) {
        Logger.log(`Error updating student ${studentId}: ${error}`);
      }
    }
  }
}
