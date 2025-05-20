
const Micro_Int_CH1_Feedback = {
  "sec_1_A": `Evaluate the student’s response to the question: “What is the open source project about?”. Write constructive feedback on how the student can improve their response. Rubric: Overview: Did the student give a brief introduction to what the project is? Purpose: Did they explain why the project was created or what problem it addresses? Solution: Did they explain how the project solves the problem or meets its goal? Provide feedback in 4 sentences, 1 for Overview, 1 for Purpose, 1 for Solution, and 1 for the overall feedback.`,
  "sec_1_B": `Evaluate the student’s response to the question: “Why is this open source project important?”. Write constructive feedback to help the student improve. Rubric: Impact: Does the student explain how the project improves a tool, platform, or workflow? Value: Do they describe the benefits to users or the wider community? Urgency: Do they convey what problems might arise without this project? Provide feedback in 4 sentences, 1 for Impact, 1 for Value, 1 for Urgency, and 1 for the overall feedback.`,
  "sec_1_C": `Evaluate the student’s response to the question: “Who is the typical user of the project and what do they use it for?”. Write constructive feedback to help the student improve Rubric: User Identification: Does the student clearly describe who the typical users are (e.g., developers, researchers, educators)?Use Case Example: Does the student provide a specific, realistic scenario where the project would be useful or solve a problem? Value Explanation: Does the student explain why this use case matters—what benefit it provides to the user, the tool, or a broader workflow? Do they address why someone might choose this project over alternatives, if applicable? Provide feedback in 4 sentences, 1 for User Identification, 1 for Case Example, 1 for Value Explanation, and 1 for the overall feedback.`,
  "sec_2_A": `Evaluate the student’s response to the question: “What is the issue that you addressed for the project? Link to the GitHub issue" Students should include a clear explanation of the issue, why resolving it is important, and provide a link to the issue on the project. Write constructive feedback on how the student can improve. Rubric: GitHub Link: Did the student include a valid link to the GitHub issue? Issue Description: Did they clearly summarize what the issue is? Type of Issue: Did they specify whether the issue is a bug, feature request, etc.? Clarity: Was their explanation clear and easy to understand? Provide feedback in 5 sentences, 1 for GitHub Link, 1 for Issue Description, 1 for Type of Issue, 1 for the Clarity, and 1 for the overall feedback.`,
  "sec_2_B": `Evaluate the student’s response to: “Why is this issue important to the open source project?” Students should explain the significance of the issue within the context of the project. This is not about what the issue is, but why fixing it matters to the project or its users. Rubric: Impact: Did the student explain how this issue affects users or the functionality of the project? Relevance: Does the student show an understanding of the issue’s place in the broader goals of the project? Justification: Did they explain why resolving the issue makes the project better (e.g., more usable, more accessible, more efficient)? Clarity: Is the explanation well-reasoned and easy to follow? Provide feedback in 5 sentences, 1 for Impact, 1 for Relevance, 1 for Justification, 1 for the Clarity, and 1 for the overall feedback.`,
  "Blog Post Checkpoint #1 - Score": `from 1 to 5.`,
  "Blog Post Checkpoint #1 - Feedback": ''
}

const Micro_Int_CH1_Data = {
  'sec_1_A': '',
  'sec_1_B': '',
  'sec_1_C': '',
  'sec_2_A': '',
  'sec_2_B': '',
  'Blog Post Checkpoint #1 - Score': 0,
  'Blog Post Checkpoint #1 - Feedback': ''
}

Micro_Int_CH1_Rubric = `Respond to three required questions (A, B, and C) in section 1 - About the project.  You can copy your responses from the earlier discussion forum as a starting point and make any revisions. Respond to two required questions (A and B) in section 2 - The issue. Respond in a JSON format using the provded format`;
