// These are the sheet names as seen in the actual Google Sheets document.
const Micro_Int_Sheets = ['Micro-Internship A', 'Micro-Internship B', 'Micro-Internship C', 'Micro-Internship D'];
const SOSE_Sheets = ['SOSE 2025'];

/*
Micro-Int
*/

// Micro-Int Getting Started
function grade_Micro_Int_CH1() {
  const model = getLatestFineTuneModel();
  const Micro_Internship_checkPoint1 = getNewSubmissions(23, 3497, Micro_Int_Sheets, true);
  rateSubmission(Micro_Internship_checkPoint1, Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric, model);
}

// Micro-Int Finish sections 1 and 2
function grade_Micro_Int_CH2() {
  const model = getLatestFineTuneModel();
  const Micro_Internship_checkPoint2 = getNewSubmissions(23, 3621, Micro_Int_Sheets, false);
  rateSubmission(Micro_Internship_checkPoint2, Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric, model);
}

// Micro-Int Second draft of sections 1 and 2
function grade_Micro_Int_CH3() {
  const model = getLatestFineTuneModel();
  const Micro_Internship_checkPoint3 = getNewSubmissions(23, 3625, Micro_Int_Sheets, false);
  rateSubmission(Micro_Internship_checkPoint3, Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric, model);
}

// Micro-Int Choose a third section
function grade_Micro_Int_CH4() {
  const model = getLatestFineTuneModel();
  const Micro_Internship_checkPoint4 = getNewSubmissions(23, 3637, Micro_Int_Sheets, false);
  rateSubmission(Micro_Internship_checkPoint4, Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric, model);
}

// Micro-Int Full draft
function grade_Micro_Int_CH5() {
  const model = getLatestFineTuneModel();
  const Micro_Internship_checkPoint5 = getNewSubmissions(23, 3639, Micro_Int_Sheets, false);
  rateSubmission(Micro_Internship_checkPoint5, Micro_Int_CH5_Data, Micro_Int_CH5_Feedback, Micro_Int_CH5_Rubric, model);
}

/*
SOSE
*/

// SOSE Getting Started
function grade_SOSE_CH1() {
  const model = getLatestFineTuneModel();
  const SOSE_Checkpoint1 = getNewSubmissions(28, 3391, SOSE_Sheets, true);
  rateSubmission(SOSE_Checkpoint1, SOSE_CH1_Data, SOSE_CH1_Feedback, SOSE_CH1_Rubric, model);
  // draftEmail(SOSE_Checkpoint1)
}

// SOSE Codebase Overview
function grade_SOSE_CH2() {
  const model = getLatestFineTuneModel();
  const SOSE_Checkpoint2 = getNewSubmissions(28, 3392, SOSE_Sheets, true);
  rateSubmission(SOSE_Checkpoint2, SOSE_CH2_Data, SOSE_CH2_Feedback, SOSE_CH2_Rubric, model);
  // draftEmail(SOSE_Checkpoint2)
}

// SOSE Challenges
function grade_SOSE_CH3() {
  const model = getLatestFineTuneModel();
  const SOSE_Checkpoint3 = getNewSubmissions(28, 3394, SOSE_Sheets, true);
  rateSubmission(SOSE_Checkpoint3, SOSE_CH3_Data, SOSE_CH3_Feedback, SOSE_CH3_Rubric, model);
  // draftEmail(SOSE_Checkpoint3)
}

// SOSE Solution
function grade_SOSE_CH4() {
  const model = getLatestFineTuneModel();
  const SOSE_Checkpoint4 = getNewSubmissions(28, 3395, SOSE_Sheets, true);
  rateSubmission(SOSE_Checkpoint4, SOSE_CH4_Data, SOSE_CH4_Feedback, SOSE_CH4_Rubric, model);
  // draftEmail(SOSE_Checkpoint4)
}

// SOSE Final
function grade_SOSE_CH5() {
  const model = getLatestFineTuneModel();
  const SOSE_Checkpoint5 = getNewSubmissions(28, 3409, SOSE_Sheets, true);
  rateSubmission(SOSE_Checkpoint5, SOSE_CH5_Data, SOSE_CH5_Feedback, SOSE_CH5_Rubric, model);
  // draftEmail(SOSE_Checkpoint5)
}
