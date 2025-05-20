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
  rateSubmission(Micro_Internship_checkPoint1, Micro_Int_CH1_Data, Micro_Int_CH1_Feedback, Micro_Int_CH1_Rubric);
  // rateSubmission(Micro_Internship_checkPoint2, formats['Micro_Int_CH2'], rubrics['Micro_Int_CH2']);
  // rateSubmission(Micro_Internship_checkPoint3, formats['Micro_Int_CH3'], rubrics['Micro_Int_CH3']);
  // rateSubmission(Micro_Internship_checkPoint4, formats['Micro_Int_CH4'], rubrics['Micro_Int_CH4']);
  // rateSubmission(Micro_Internship_checkPoint5, formats['Micro_Int_CH5'], rubrics['Micro_Int_CH5']);
}
