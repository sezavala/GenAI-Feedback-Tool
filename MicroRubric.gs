// ====== Micro-Internship Checkpoint 1 (Getting started) ======
const Micro_Int_CH1_Feedback = {
  "Section1A": `Evaluate the student’s response to the question: “What is the open source project about?”

The student should describe the overall project — not their assigned issue. If the response only focuses on the issue they're working on, deduct points accordingly.

Rubric:
- Overview: Did the student clearly state what the project is? (Name, type, purpose, and domain)
- Purpose: Did they explain why the project was created or what problem it solves?
- Approach: Did they describe how the project works (features, functions, use cases)?
- Usage: Did they mention who uses the project or its broader impact?

Do not grade on grammar or phrasing quality — only on clarity and content. Provide feedback in 5 sentences: 1 for Overview, 1 for Purpose, 1 for Approach, 1 for Usage, and 1 for overall feedback.`,

  "Section1B": `Evaluate the student’s response to the question: “Why is this open source project important?”

The student must focus on the project’s significance — not just their assigned issue. Deduct points if the explanation only relates to their task.

Rubric:
- Impact: Does the student explain how the project improves a tool, platform, or workflow?
- Value: Do they describe specific benefits to users or the community?
- Urgency: Do they mention what problems might arise if this project didn’t exist?

Ignore grammar issues. Provide feedback in 4 sentences: 1 for Impact, 1 for Value, 1 for Urgency, and 1 for overall feedback.`,

  "Section1C": `Evaluate the student’s response to: “Who is the typical user of the project and what do they use it for?”

Rubric:
- User Identification: Did the student clearly describe who the typical users are (e.g., developers, researchers, educators)?
- Use Case Example: Did they provide a specific, realistic example?
- Value Explanation: Did they explain why this use case matters or how it benefits the user?

Don’t score grammar. Provide feedback in 4 sentences: 1 for User Identification, 1 for Case Example, 1 for Value Explanation, and 1 for overall feedback.`,

  "Section2A": `Evaluate the student’s response to the question: “What is the issue that you addressed for the project? Link to the GitHub issue.”

The student should summarize the issue clearly, specify the type (bug, enhancement, etc.), and include a valid GitHub issue link. 

Rubric:
- GitHub Link: Did they provide a valid, working issue link?
- Issue Description: Did they summarize what the issue is?
- Type of Issue: Did they specify if it’s a bug, feature, etc.?
- Clarity: Is their explanation clear and logical?

Do not score grammar. Provide feedback in 5 sentences: 1 for GitHub Link, 1 for Issue Description, 1 for Type of Issue, 1 for Clarity, and 1 for overall feedback.`,

  "Section2B": `Evaluate the student’s response to: “Why is this issue important to the open source project?”

This is not about what the issue is — it’s about why resolving it matters. The student should explain how the issue impacts the user experience or project quality.

Rubric:
- Impact: Does the student explain how the issue affects users or functionality?
- Relevance: Do they show how it fits into the project’s goals?
- Justification: Do they explain how fixing it improves the project?
- Clarity: Is the reasoning well-organized and easy to follow?

Ignore grammar. Provide feedback in 5 sentences: 1 for Impact, 1 for Relevance, 1 for Justification, 1 for Clarity, and 1 for overall feedback.`,

  "Blog Post Checkpoint #1 - Score": `From 1 to 5. Only use whole numbers.`,
  "Blog Post Checkpoint #1 - Feedback": `Write 3–4 full sentences that summarize how the student did overall. Highlight their strengths and identify key areas for improvement.`
};

const Micro_Int_CH1_Data = {
  'Section1A': '',
  'Section1B': '',
  'Section1C': '',
  'Section2A': '',
  'Section2B': '',
  'Blog Post Checkpoint #1 - Score': 0,
  'Blog Post Checkpoint #1 - Feedback': ''
};

const Micro_Int_CH1_Rubric = `Respond to three required questions (A, B, and C) in section 1 - About the project. You can copy your responses from the earlier discussion forum as a starting point and make any revisions. Respond to two required questions (A and B) in section 2 - The issue. Respond in a JSON format using the provided format.`;

// ====== Micro-Internship Checkpoint 2 (Answer Section 2C) ======
const Micro_Int_CH2_Feedback = {
  "Section2C": `Evaluate the student’s response to the question: “Identify the key location(s) of the codebase that are relevant to solving the issue. Describe the purpose of the file, function, or folder you identified.”

The student should provide file names, functions, or folders from their project’s codebase and explain why these are relevant to solving their issue.

Rubric:
- Locations Provided: Did the student provide some file names from their project’s codebase?
- Overview: Did the student explain what the purpose of the file or code area is?
- Relevance: Did the student explain why the file is important to solving the issue?

Provide feedback in 4 sentences: 1 for Locations Provided, 1 for Overview, 1 for Relevance, and 1 for overall feedback.`,

  "Blog Post Checkpoint #2 - Score": `From 1 to 5. Only use whole numbers.`,
  "Blog Post Checkpoint #2 - Feedback": `Write 3–4 full sentences that summarize how the student did overall. Highlight their strengths and identify key areas for improvement.`
};

const Micro_Int_CH2_Data = {
  'Section2C': '',
  'Blog Post Checkpoint #2 - Score': 0,
  'Blog Post Checkpoint #2 - Feedback': ''
};

const Micro_Int_CH2_Rubric = `Purpose: Complete the first two sections of your blog post.

Steps:
- Respond to question C in section 2. 
- Optional: If you encountered any challenges while setting up your project (unclear instructions or an unforeseen build error), describe it in Section 4 (Challenges), questions A and B.`;

// ====== Micro-Internship Checkpoints 3 (Second Draft of Sec 1-2) ======
const Micro_Int_CH3_Feedback = {
  'Section1A': '',
  'Section1B': '',
  'Section1C': '',
  'Section2A': '',
  'Section2B': '',
  'Section2C': '',
  'Blog Post Checkpoint #2 - Score': 0,
  'Blog Post Checkpoint #2 - Feedback': ''
};

const Micro_Int_CH3_Data = {
  'Section1A': '',
  'Section1B': '',
  'Section1C': '',
  'Section2A': '',
  'Section2B': '',
  'Section2C': '',
  'Blog Post Checkpoint #2 - Score': 0,
  'Blog Post Checkpoint #2 - Feedback': ''
};
const Micro_Int_CH3_Rubric = `The goal for this week is to translate your answers into a more polished write up that resembles an actual blog post. Your writeup should meet the following criteria:

Give your post a title. 
Organize the write up into sections with headings / sub-headings   
Instead of a list of bullet points as in the template, your writeup should be organized into paragraphs that tell a story. 
Insert at least one visual (such as a screenshot). 
Annotate the visual in some way (with arrows / highlights) to emphasize something specific about the visual. `;

// ====== Micro-Internship Checkpoints 4 (Third section) ======
const Micro_Int_CH4_Feedback = {};
const Micro_Int_CH4_Data = {};
const Micro_Int_CH4_Rubric = `For the third section, you can choose any one of the remaining sections of the template (Sections 3, 4, or 5).  You can of course complete all of the remaining sections, but you are only required only to complete one during the Micro-internship.`;

// ====== Micro-Internship Checkpoints 5 ======
const Micro_Int_CH5_Feedback = {};
const Micro_Int_CH5_Data = {};
const Micro_Int_CH5_Rubric = `In the previous weeks, you answered the questions for three sections of the templateLinks to an external site.:

Section 1 - About the project
Section 2 - About the issue
Section 3 - Your choice of one of the following: Codebase Overview, Challenges, or the Solution.
Your writeup should meet the following criteria:

Give your post a title. 
Organize the write up into sections with headings / sub-headings   
Instead of a list of bullet points as in the template, your writeup should be organized into paragraphs that tell a story. 
Insert at least one visual (such as a screenshot) for Section 1 (About the project) or Section 2 (About the Issue)  Annotate the visual in some way (with arrows / highlights) to emphasize something specific about the visual. 
Insert at least one technical visual for your third section `;
