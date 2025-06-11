// ====== Config Variables ======
const MICRO_INT_COURSE_ID = 23;
const MICRO_INT_SHEETS = ['Micro-Internship A', 'Micro-Internship B', 'Micro-Internship C', 'Micro-Internship D'];

const SOSE_COURSE_ID = 28;
const SOSE_SHEET = 'SOSE 2025';

// ====== Shared Grading Helper ======
function gradeCheckpointBySheet(courseId, assignmentId, sheetName, data, feedback, rubric, isCheckpoint1 = false) {
  const model = getLatestFineTuneModel();
  if (!model) {
    Logger.log("No fine-tuned model available.");
    return;
  }

  const submission = getNewSubmissions(courseId, assignmentId, [sheetName], isCheckpoint1);
  rateSubmission(submission, data, feedback, rubric, model);
  // pushToCanvas(submission, courseId, assignmentId);
}

// ====== Micro-Internship Grading ======

// CH1
const CH1_ID = 3497;
function grade_Micro_Int_A_CH1() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH1_ID, MICRO_INT_SHEETS[0], Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric, true); }
function grade_Micro_Int_B_CH1() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH1_ID, MICRO_INT_SHEETS[1], Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric, true); }
function grade_Micro_Int_C_CH1() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH1_ID, MICRO_INT_SHEETS[2], Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric, true); }
function grade_Micro_Int_D_CH1() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH1_ID, MICRO_INT_SHEETS[3], Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric, true); }

// CH2
const CH2_ID = 3621;
function grade_Micro_Int_A_CH2() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH2_ID, MICRO_INT_SHEETS[0], Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric); }
function grade_Micro_Int_B_CH2() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH2_ID, MICRO_INT_SHEETS[1], Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric); }
function grade_Micro_Int_C_CH2() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH2_ID, MICRO_INT_SHEETS[2], Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric); }
function grade_Micro_Int_D_CH2() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH2_ID, MICRO_INT_SHEETS[3], Micro_Int_CH2_Data, Micro_Int_CH2_Feedback, Micro_Int_CH2_Rubric); }

// CH3
const CH3_ID = 3625;
function grade_Micro_Int_A_CH3() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH3_ID, MICRO_INT_SHEETS[0], Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric); }
function grade_Micro_Int_B_CH3() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH3_ID, MICRO_INT_SHEETS[1], Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric); }
function grade_Micro_Int_C_CH3() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH3_ID, MICRO_INT_SHEETS[2], Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric); }
function grade_Micro_Int_D_CH3() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH3_ID, MICRO_INT_SHEETS[3], Micro_Int_CH3_Data, Micro_Int_CH3_Feedback, Micro_Int_CH3_Rubric); }

// CH4
const CH4_ID = 3637;
function grade_Micro_Int_A_CH4() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH4_ID, MICRO_INT_SHEETS[0], Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric); }
function grade_Micro_Int_B_CH4() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH4_ID, MICRO_INT_SHEETS[1], Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric); }
function grade_Micro_Int_C_CH4() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH4_ID, MICRO_INT_SHEETS[2], Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric); }
function grade_Micro_Int_D_CH4() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH4_ID, MICRO_INT_SHEETS[3], Micro_Int_CH4_Data, Micro_Int_CH4_Feedback, Micro_Int_CH4_Rubric); }

// CH5
const CH5_ID = 3639;
function grade_Micro_Int_A_CH5() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH5_ID, MICRO_INT_SHEETS[0], Micro_Int_CH5_Data, Micro_Int_CH5_Feedback, Micro_Int_CH5_Rubric); }
function grade_Micro_Int_B_CH5() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH5_ID, MICRO_INT_SHEETS[1], Micro_Int_CH5_Data, Micro_Int_CH5_Feedback, Micro_Int_CH5_Rubric); }
function grade_Micro_Int_C_CH5() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH5_ID, MICRO_INT_SHEETS[2], Micro_Int_CH5_Data, Micro_Int_CH5_Feedback, Micro_Int_CH5_Rubric); }
function grade_Micro_Int_D_CH5() { gradeCheckpointBySheet(MICRO_INT_COURSE_ID, CH5_ID, MICRO_INT_SHEETS[3], Micro_Int_CH5_Data, Micro_Int_CH5_Feedback, Micro_Int_CH5_Rubric); }

// ====== SOSE Grading (only one sheet) ======

const SOSE_CH1_ID = 3391;
const SOSE_CH2_ID = 3392;
const SOSE_CH3_ID = 3394;
const SOSE_CH4_ID = 3395;
const SOSE_CH5_ID = 3409;

function grade_SOSE_CH1() { gradeCheckpointBySheet(SOSE_COURSE_ID, SOSE_CH1_ID, SOSE_SHEET, SOSE_CH1_Data, SOSE_CH1_Feedback, SOSE_CH1_Rubric, true); }
function grade_SOSE_CH2() { gradeCheckpointBySheet(SOSE_COURSE_ID, SOSE_CH2_ID, SOSE_SHEET, SOSE_CH2_Data, SOSE_CH2_Feedback, SOSE_CH2_Rubric); }
function grade_SOSE_CH3() { gradeCheckpointBySheet(SOSE_COURSE_ID, SOSE_CH3_ID, SOSE_SHEET, SOSE_CH3_Data, SOSE_CH3_Feedback, SOSE_CH3_Rubric); }
function grade_SOSE_CH4() { gradeCheckpointBySheet(SOSE_COURSE_ID, SOSE_CH4_ID, SOSE_SHEET, SOSE_CH4_Data, SOSE_CH4_Feedback, SOSE_CH4_Rubric); }
function grade_SOSE_CH5() { gradeCheckpointBySheet(SOSE_COURSE_ID, SOSE_CH5_ID, SOSE_SHEET, SOSE_CH5_Data, SOSE_CH5_Feedback, SOSE_CH5_Rubric); }
