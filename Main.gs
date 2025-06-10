// These are the sheet names as seen in the actual Google Sheets document.
Micro_Int_Sheets = ['Micro-Internship A', 'Micro-Internship B', 'Micro-Internship C', 'Micro-Internship D'];
SOSE_Sheets = ['SOSE 2025'];

// These are current parameters for 2024-C
// Micro-Int Getting Started
function grade_Micro_Int_CH1() {
  const Micro_Internship_checkPoint1 = getNewSubmissions(23, 3497, Micro_Int_Sheets, true);
  // rateSubmission(Micro_Internship_checkPoint1, Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric);
}

// Micro-Int Finish sections 1 and 2
function grade_Micro_Int_CH2() {
  const Micro_Internship_checkPoint2 = getNewSubmissions(23, 3621, Micro_Int_Sheets, false);
  // rateSubmission(Micro_Internship_checkPoint2, Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric);
}

// Micro-Int Second draft of sections 1 and 2
function grade_Micro_Int_CH3() {
  const Micro_Internship_checkPoint3 = getNewSubmissions(23, 3625, Micro_Int_Sheets, false);
  // rateSubmission(Micro_Internship_checkPoint3, Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric);
}

// Micro-Int Choose a third section
function grade_Micro_Int_CH4() {
  const Micro_Internship_checkPoint4 = getNewSubmissions(23, 3637, Mirco_Int_Sheets, false);
  // rateSubmission(Micro_Internship_checkPoint4, Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric);
}

// Micro-Int Full draft
function grade_Micro_Int_CH5() {
  const Micro_Internship_checkPoint5 = getNewSubmissions(23, 3639, Micro_Int_Sheets, false);
  // rateSubmission(Micro_Internship_checkPoint4, Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric);
}

// Change Parameters (The current parameters are for Summer 2024)
// SOSE Getting Started
function grade_SOSE_CH1() {
  const SOSE_Checkpoint1 = getNewSubmissions(28, 3391, SOSE_Sheets, true);
  // rateSubmission(SOSE_Checkpoint1, SOSE_CH1_Data, SOSE_CH1_Feedback, SOSE_CH1_Rubric);
}
