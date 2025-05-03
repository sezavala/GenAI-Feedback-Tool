function main() {
  // Grab new submissions from each Micro_Internship Writing Checkpoint

  const Micro_Internship_checkPoint1 = getNewSubmissions(23, 3497);
  // const Micro_Internship_checkPoint2 = getNewSubmissions(23, 3621);
  // const Micro_Internship_checkPoint3 = getNewSubmissions(23, 3625);
  // const Micro_Internship_checkPoint4 = getNewSubmissions(23, 3637);
  // const Micro_Internship_checkPoint5 = getNewSubmissions(23, 3639);

  // Grab new submissions from each SOSE Writing Checkpoint
  // FUTURE
  
  // Pass submissions into chatGPT
  rateSubmission(Micro_Internship_checkPoint1, formats['Micro_Int_CH1'], rubrics['Micro_Int_CH1']);
  // rateSubmission(Micro_Internship_checkPoint2, formats['Micro_Int_CH2'], rubrics['Micro_Int_CH2']);
  // rateSubmission(Micro_Internship_checkPoint3, formats['Micro_Int_CH3'], rubrics['Micro_Int_CH3']);
  // rateSubmission(Micro_Internship_checkPoint4, formats['Micro_Int_CH4'], rubrics['Micro_Int_CH4']);
  // rateSubmission(Micro_Internship_checkPoint5, formats['Micro_Int_CH5'], rubrics['Micro_Int_CH5']);

  // Add Responses to sheets and canvas
  gradeSubmission(Micro_Internship_checkPoint1)
}

const formats = {
  "Micro_Int_CH1": `{
    "sec_1_A": "Feedback on project overview and any recommendations",
    "sec_1_B": "Feedback on importance of testing and any recommendations",
    "sec_1_C": "Feedback on contribution description and any recommendations",
    "sec_2_A": "Feedback on issue description and any recommendations",
    "sec_2_B": "Feedback on visual explanations and any recommendations",
    "Blog Post Checkpoint #1 - Score": 1-5,
    "Blog Post Checkpoint #1 - Feedback": "Overall evaluation of the blog post plus overall recommendations"
  }`,
  "Micro_Int_CH2": ``
};

rubrics = {
  "Micro_Int_CH1": "Respond to three required questions (A, B, and C) in section 1 - About the project.  You can copy your responses from the earlier discussion forum as a starting point and make any revisions. Respond to two required questions (A and B) in section 2 - The issue."
}
