// ====== Email Draft Helper ======
function draftEmailBySheet(sheetName, sections, checkpoint) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  const header = data[0];
  const firstName = header.indexOf('Name_First')
  const lastName = header.indexOf('Name_Last')
  const emailCol = header.indexOf('Email');
  const draftCol = header.indexOf(checkpoint + ' Email Draft');
  const canvasIdCol = header.indexOf('Canvas ID');

  const sectionKeys = Object.keys(sections);

  for (let row = 1; row < data.length; row++) {
    const rowData = data[row];
    const email = rowData[emailCol];
    const name = rowData[firstName] + " " + rowData[lastName];
    const draftText = rowData[draftCol];
    const canvasId = rowData[canvasIdCol];

    if ((typeof draftText === 'string' && draftText.trim() !== '') || !email) continue;

    const hasAllFeedback = sectionKeys.every(key => {
      const col = header.indexOf(key);
      const val = rowData[col];
      return val !== undefined && val.toString().trim() !== '';
    });

    if (!hasAllFeedback) continue;

    let emailBody = `Hello ${name},\n\nHere is your feedback for Blog Post ${checkpoint}:\n\n`;
    sectionKeys.forEach(key => {
      if (!key.endsWith("Feedback")){
        const feedbackCol = header.indexOf(key);
        const feedback = rowData[feedbackCol];
        emailBody += `${key}: ${feedback}\n\n`;
      }
    });

    emailBody += `If you have any questions, feel free to reach out!\n\nBest,\nThe Computing Talent Initiative`;

    sheet.getRange(row + 1, draftCol + 1).setValue(emailBody);
  }
}

// ====== Send Email Helper ======
function sendApprovedEmails(sheetName, checkpoint) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  const headers = data[0];
  const firstNameCol = headers.indexOf('Name_First');
  const lastNameCol = headers.indexOf('Name_Last');
  const emailCol = headers.indexOf('Email');
  const draftCol = headers.indexOf(`${checkpoint} Email Draft`);
  const approvedCol = headers.indexOf(`${checkpoint} Email Approved`);
  const sentCol = headers.indexOf(`${checkpoint} Email Sent`);

  if (draftCol === -1 || approvedCol === -1 || sentCol === -1 || emailCol === -1) {
    Logger.log(`One or more required columns are missing for ${checkpoint}.`);
    return;
  }

  for (let row = 1; row < data.length; row++) {
    const rowData = data[row];
    const isApproved = rowData[approvedCol];
    const alreadySent = rowData[sentCol];
    const email = rowData[emailCol];
    const firstName = rowData[firstNameCol] || '';
    const lastName = rowData[lastNameCol] || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const emailBody = rowData[draftCol];

    // Skip if already sent, not approved, missing email or draft
    if (!isApproved || alreadySent || !email || !emailBody) continue;

    const subject = `Feedback for Blog Post ${checkpoint}`;

    try {
      GmailApp.sendEmail(email, subject, emailBody);
      sheet.getRange(row + 1, sentCol + 1).setValue(true);
      Logger.log(`Sent to ${fullName} (${email}) for ${checkpoint}`);
    } catch (e) {
      Logger.log(`Failed to send email to ${email}: ${e}`);
    }
  }
}

// ====== Micro-Internship Email Drafts ======

// CH1
function draftEmail_MicroInt_CH1_A() { draftEmailBySheet(MICRO_INT_SHEETS[0], Micro_Int_CH1_Data, "CH1"); }
function draftEmail_MicroInt_CH1_B() { draftEmailBySheet(MICRO_INT_SHEETS[1], Micro_Int_CH1_Data, "CH1"); }
function draftEmail_MicroInt_CH1_C() { draftEmailBySheet(MICRO_INT_SHEETS[2], Micro_Int_CH1_Data, "CH1"); }
function draftEmail_MicroInt_CH1_D() { draftEmailBySheet(MICRO_INT_SHEETS[3], Micro_Int_CH1_Data, "CH1"); }

// CH2
function draftEmail_MicroInt_CH2_A() { draftEmailBySheet(MICRO_INT_SHEETS[0], Micro_Int_CH2_Data, "CH2"); }
function draftEmail_MicroInt_CH2_B() { draftEmailBySheet(MICRO_INT_SHEETS[1], Micro_Int_CH2_Data, "CH2"); }
function draftEmail_MicroInt_CH2_C() { draftEmailBySheet(MICRO_INT_SHEETS[2], Micro_Int_CH2_Data, "CH2"); }
function draftEmail_MicroInt_CH2_D() { draftEmailBySheet(MICRO_INT_SHEETS[3], Micro_Int_CH2_Data, "CH2"); }

// CH3
function draftEmail_MicroInt_CH3_A() { draftEmailBySheet(MICRO_INT_SHEETS[0], Micro_Int_CH3_Data, "CH3"); }
function draftEmail_MicroInt_CH3_B() { draftEmailBySheet(MICRO_INT_SHEETS[1], Micro_Int_CH3_Data, "CH3"); }
function draftEmail_MicroInt_CH3_C() { draftEmailBySheet(MICRO_INT_SHEETS[2], Micro_Int_CH3_Data, "CH3"); }
function draftEmail_MicroInt_CH3_D() { draftEmailBySheet(MICRO_INT_SHEETS[3], Micro_Int_CH3_Data, "CH3"); }

// CH4
function draftEmail_MicroInt_CH4_A() { draftEmailBySheet(MICRO_INT_SHEETS[0], Micro_Int_CH4_Data, "CH4"); }
function draftEmail_MicroInt_CH4_B() { draftEmailBySheet(MICRO_INT_SHEETS[1], Micro_Int_CH4_Data, "CH4"); }
function draftEmail_MicroInt_CH4_C() { draftEmailBySheet(MICRO_INT_SHEETS[2], Micro_Int_CH4_Data, "CH4"); }
function draftEmail_MicroInt_CH4_D() { draftEmailBySheet(MICRO_INT_SHEETS[3], Micro_Int_CH4_Data, "CH4"); }

// CH5
function draftEmail_MicroInt_CH5_A() { draftEmailBySheet(MICRO_INT_SHEETS[0], Micro_Int_CH5_Data, "CH5"); }
function draftEmail_MicroInt_CH5_B() { draftEmailBySheet(MICRO_INT_SHEETS[1], Micro_Int_CH5_Data, "CH5"); }
function draftEmail_MicroInt_CH5_C() { draftEmailBySheet(MICRO_INT_SHEETS[2], Micro_Int_CH5_Data, "CH5"); }
function draftEmail_MicroInt_CH5_D() { draftEmailBySheet(MICRO_INT_SHEETS[3], Micro_Int_CH5_Data, "CH5"); }

// ====== Micro-Internship Send Emails ======

// CH1
function sendEmail_MicroInt_CH1_A() { sendApprovedEmails(MICRO_INT_SHEETS[0], "CH1"); }
function sendEmail_MicroInt_CH1_B() { sendApprovedEmails(MICRO_INT_SHEETS[1], "CH1"); }
function sendEmail_MicroInt_CH1_C() { sendApprovedEmails(MICRO_INT_SHEETS[2], "CH1"); }
function sendEmail_MicroInt_CH1_D() { sendApprovedEmails(MICRO_INT_SHEETS[3], "CH1"); }

// CH2
function sendEmail_MicroInt_CH2_A() { sendApprovedEmails(MICRO_INT_SHEETS[0], "CH2"); }
function sendEmail_MicroInt_CH2_B() { sendApprovedEmails(MICRO_INT_SHEETS[1], "CH2"); }
function sendEmail_MicroInt_CH2_C() { sendApprovedEmails(MICRO_INT_SHEETS[2], "CH2"); }
function sendEmail_MicroInt_CH2_D() { sendApprovedEmails(MICRO_INT_SHEETS[3], "CH2"); }

// CH3
function sendEmail_MicroInt_CH3_A() { sendApprovedEmails(MICRO_INT_SHEETS[0], "CH3"); }
function sendEmail_MicroInt_CH3_B() { sendApprovedEmails(MICRO_INT_SHEETS[1], "CH3"); }
function sendEmail_MicroInt_CH3_C() { sendApprovedEmails(MICRO_INT_SHEETS[2], "CH3"); }
function sendEmail_MicroInt_CH3_D() { sendApprovedEmails(MICRO_INT_SHEETS[3], "CH3"); }

// CH4
function sendEmail_MicroInt_CH4_A() { sendApprovedEmails(MICRO_INT_SHEETS[0], "CH4"); }
function sendEmail_MicroInt_CH4_B() { sendApprovedEmails(MICRO_INT_SHEETS[1], "CH4"); }
function sendEmail_MicroInt_CH4_C() { sendApprovedEmails(MICRO_INT_SHEETS[2], "CH4"); }
function sendEmail_MicroInt_CH4_D() { sendApprovedEmails(MICRO_INT_SHEETS[3], "CH4"); }

// CH5
function sendEmail_MicroInt_CH5_A() { sendApprovedEmails(MICRO_INT_SHEETS[0], "CH5"); }
function sendEmail_MicroInt_CH5_B() { sendApprovedEmails(MICRO_INT_SHEETS[1], "CH5"); }
function sendEmail_MicroInt_CH5_C() { sendApprovedEmails(MICRO_INT_SHEETS[2], "CH5"); }
function sendEmail_MicroInt_CH5_D() { sendApprovedEmails(MICRO_INT_SHEETS[3], "CH5"); }

// ====== SOSE Email Drafts ======

function draftEmail_SOSE_CH1() { draftEmailBySheet('SOSE 2025', SOSE_CH1_Data, "CH1"); }
function draftEmail_SOSE_CH2() { draftEmailBySheet('SOSE 2025', SOSE_CH2_Data, "CH2"); }
function draftEmail_SOSE_CH3() { draftEmailBySheet('SOSE 2025', SOSE_CH3_Data, "CH3"); }
function draftEmail_SOSE_CH4() { draftEmailBySheet('SOSE 2025', SOSE_CH4_Data, "CH4"); }
function draftEmail_SOSE_CH5() { draftEmailBySheet('SOSE 2025', SOSE_CH5_Data, "CH5"); }

// ====== SOSE Send Emails ======

function sendEmail_SOSE_CH1() { sendApprovedEmails('SOSE 2025', 'CH1'); }
function sendEmail_SOSE_CH2() { sendApprovedEmails('SOSE 2025', 'CH2'); }
function sendEmail_SOSE_CH3() { sendApprovedEmails('SOSE 2025', 'CH3'); }
function sendEmail_SOSE_CH4() { sendApprovedEmails('SOSE 2025', 'CH4'); }
function sendEmail_SOSE_CH5() { sendApprovedEmails('SOSE 2025', 'CH5'); }
