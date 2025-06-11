// SOSE Checkpoint 1
const SOSE_CH1_Feedback = {
    "Section1A": `What is the open-source project about?
The student should describe what their assigned open-source project is about and its platform, NOT their assigned issue. (e.g., Oppia is a learning platform accessible through the web and Android.)
Rubric:
Overview: Did the student clearly state what the project is? (Name and Platform)
Do not grade on grammar or phrasing quality — only on clarity and content. Provide feedback in 2 sentences: 1 for the Overview, and 1 for overall feedback.`,
    "Section1B": `Why is this open-source project important?
The student must focus on the project’s significance, NOT their assigned issues' significance. (e.g., Oppia’s mission is to serve learners across the globe by providing high-quality education, improving learning by making it more accessible, engaging, and effective.)
Rubric:
Goal: Does the student explain what the goal of the project is?
Value: Do they describe what the project improves?
Ignore grammar issues. Provide feedback in 3 sentences: 1 for Goal, 1 for Value, and 1 for overall feedback.`,
    "Section1C": `Who is the typical user of the project and what do they use it for?
The student should describe what category of people the project targets (e.g., developers, doctors, anyone, and more). They should also provide a use-case example of how they would utilize the project. (e.g., The typical users on Oppia are students from underprivileged communities seeking education. Students can log into Oppia at any time and access their wide collection of courses on various topics.) 
Rubric:
User Identification: Did the student clearly describe who the typical users are (e.g., developers, researchers, educators)?
Use Case Example: Did they provide a specific, realistic example?
Don’t score grammar. Provide feedback in 3 sentences: 1 for User Identification, 1 for Case Example, and 1 for overall feedback.`,
    "Section2A": `What is the issue that you addressed for the project? Link to the GitHub issue.
The student should summarize their assigned issue from the open-source project clearly and include a valid GitHub issue link. (eg. Our team's issue was to fix a bug on the live site that would display a 404 error, disrupting the user experience. Github link: https://github.com/oppia/oppia/issues/19733 )
Rubric:
GitHub Link: Did they provide a valid, working issue link?
Issue Description: Did they summarize what the issue is?
Clarity: Is their explanation clear and logical?
Do not score grammar. Provide feedback in 4 sentences: 1 for GitHub Link, 1 for Issue Description, 1 for Clarity, and 1 for overall feedback.`,
    "Section2B": `Why is this issue important to the open-source project?
The student should focus on explaining why resolving their assigned issue will benefit the open-source project. The student should explain how the issue impacts the user experience or project quality. (e.g., This bug impacted some of the lessons on Oppia, specifically the ones involving music, since their file was reported as missing.)
Rubric:
Impact: Did the student explain how the issue affects users or functionality?
Clarity: Is the reasoning well-organized and easy to follow?
Ignore grammar. Provide feedback in 3 sentences: 1 for Impact, 1 for Clarity, and 1 for overall feedback.`,
    "Blog Post Checkpoint #1 - Score": `From 1 to 5. Only use whole numbers.`
};

const SOSE_CH1_Data = {
    'Section1A': '',
    'Section1B': '',
    'Section1C': '',
    'Section2A': '',
    'Section2B': '',
    'Blog Post Checkpoint #1 - Score': 0,
};

const SOSE_CH1_Rubric = `Purpose: Get started on your blog post and complete the first two sections.

Steps:
- Respond to the three required questions in section 1 - About the project - you can copy your responses from earlier discussion forums as starting point and make any revisions.
- Respond to the two required questions in section 2 - The issue - you can copy your responses from earlier discussion forums as starting point and make any revisions.
- Optional: Response to any of the options questions in sections 1 or 2`;


// SOSE Checkpoint 2
const SOSE_CH2_Feedback = {
    'Section3A': `Describe the tech stack. For each component of the tech stack, describe its purpose in the overall app. We recommend creating a table with two columns: the left column should name the technology, and the right column should describe its purpose.
The student should include at least one tool (e.g., programming language, framework, or platform) and a description of the purpose for each tool. (e.g, Angular powers Oppia’s UI with a component-based architecture that promotes reusability and consistency).
Rubric:
Tool: Did the student include at least one tool (programming language, framework, or platform)?
Purpose: Did the student include a description of the purpose for each tool?
Do not grade on grammar or phrasing quality — only on clarity and content. Provide feedback in 3 sentences: 1 for the Tool, 1 for Purpose, and 1 for overall feedback.`,
    'Section3C': `Describe the full workflow of the code from start to finish by walking through one specific use case. Start with the user actions/inputs and explain what happens at each step of the diagram in your own words, leading to the result. Optional: Consider numbering the relevant components in your System Diagram so that you can refer to them by number as you describe the workflow.
The student should focus on coming up with one specific use case of the project and provide a simple step-by-step explanation of how inputs lead to certain outputs. (e.g., If users want to create an exploration in Oppia, they must click the create exploration button, which calls the explorationCreation service…)
Rubric:
Clear: Is the student clear on what specific use case they will be presenting?
Backend: Does the student's answer include at least one tool used in the backend for their specific use case? 
Result: Did the student include the result of their workflow example?
Don’t score grammar. Provide feedback in 3 sentences: 1 for Clear, 1 for Backend, 1 for Result, and 1 for overall feedback.`,
    "Blog Post Checkpoint #2 - Score": `From 1 to 5. Only use whole numbers.`
};

const SOSE_CH2_Data = {
    'Section3A': '',
    'Section3C': '',
    'Blog Post Checkpoint #2 - Score': 0,
};

const SOSE_CH2_Rubric = `Purpose: Continue building your blog post

Steps:
- Respond to the three required questions in section 3 - Codebase Overview - you can copy your responses from earlier discussion forums as a starting point and make any revisions.`;


// SOSE Checkpoint 3
const SOSE_CH3_Feedback = {
    'Section4A': `Identify at least one specific technical challenge you faced in the project.
The student should include at least one challenge they may have faced during their time on the project (issues setting up locally, issues with team meeting times, issues with collaboration, and more). Example: When setting up Oppia, many, including myself, faced hurdles related to missing files and setup errors that made configuring the environment challenging.
Rubric:
Challenge: Did the student explain at least one challenge they faced at any point during their experience?
Do not grade on grammar or phrasing quality — only on clarity and content. Provide feedback in 2 sentences: 1 for Challenge, and 1 for overall feedback.`,
    'Section4B': `List out at least three different self-directed problem-solving attempts you made to address the challenge(s).
The student should list out at least three unique problem-solving strategies that they attempted to address the challenges they faced. Example: I always follow these three steps before trying to solve a problem, I start off on my own, searching for more information about the issue I am facing (stackoverflow being the best source), if there is no success, I start off adding my message to any available discussion boards (slack, github discussions, github issue forum), and if I was still unable to find a solution, I would schedule a 1:1 meeting with one of CodeDays mentors.
Rubric:
Attempts: Does the student include at least three unique problem-solving strategies?
Ignore grammar issues. Provide feedback in 2 sentences: 1 for Attempts, and 1 for overall feedback.`,
    'Section4C': `If you couldn't solve the problem by yourself, share who you reached out to get help
If the student was unable to solve the problem on their solo attempt and had to result in asking for help, the student should share who helped them. Example: After spending time looking through the project's documentation, I was unable to find a solution on my own and resorted to submitting a discussion post on Oppias forums, looking for assistance.
Rubric:
Credit: If applicable, did the student reference who assisted them with their challenge?
Don’t score grammar. Provide feedback in 2 sentences: 1 for Credit, and 1 for overall feedback.`,
    'Section4D': `What is the status of the technical challenge?
The student should provide whether or not they were able to overcome the challenge. It might be important to think of some potential steps you could include for the future, if the status is unresolved. Example: After continuously failing, I resorted to Direnv’s documentation for a solution and found that Oppia had an error in their documentation for Mac installation, which was why I was facing this issue, and I quickly resolved it.  
Rubric:
Status: Does the student include a status on whether they solved their issue?
Future Steps: If the student was unable to resolve the issue, do they provide extra steps that they could take to search for a solution?
Don’t score grammar. Provide feedback in 3 sentences: 1 for Status, 1 for Future Steps, and 1 for overall feedback.`,
    "Blog Post Checkpoint #3 - Score": `From 1 to 5. Only use whole numbers.`
};

const SOSE_CH3_Data = {
    'Section4A': '',
    'Section4B': '',
    'Section4C': '',
    'Section4D': '',
    'Blog Post Checkpoint #3 - Score': 0
};

const SOSE_CH3_Rubric = `Purpose: Continue building your blog post

Steps:
- Respond to the four required questions in section 4 - Challenges - you can copy your responses from earlier discussion forums as a starting point and make any revisions.`;


// SOSE Checkpoint 4
const SOSE_CH4_Feedback = {
    'Section5A': `Describe your final solution. Explain in your own words what you did and how it solved the original problem.
The student should explain what problem they are solving, what they did, and how they solved the problem. Example: While my team was able to get everything running on their end, I faced issues with getting my environment running. I consulted the documentation on direnv.net and discovered a page that used a similar 'use' command for Ruby. This led me to identify a mistake in the Oppia setup documentation, which had contributed to the problem.
Rubric:
Problem: Does the student describe what issue their solution solves?
Description: Does the student describe their workflow for solving the problem?
Explanation: Does the student explain how their solution solves the problem?
Do not grade on grammar or phrasing quality — only on clarity and content. Provide feedback in 4 sentences: 1 for Problem, 1 for Description, 1 for Explanation, and 1 for overall feedback.`,
    'Section5B': `When describing your solution, reference at least 1 key technology / framework from your tech stack summary (answer to 3A). Be sure to get feedback on this part from your mentor to make sure your usage of the technical terms is accurate. 
In the solution(s) portion of the blog, the students should reference at least 1 technology/framework from their tech stack summary and reference 1 component. Example: On Oppias live server, their sound file in MidiJS had a different file name than on their test server. This was caused by our Angular Services component, which was likely causing the file to be renamed during production. 
Rubric:
Technology/Framework: Does the student include at least one technology or one framework used?
Component: Does the student mention at least one component from their project?
Ignore grammar issues. Provide feedback in 3 sentences: 1 for Technology/Framework, 1 for Component, and 1 for overall feedback.`,
    'Section5C': `How did you test / verify that it works? Can you show some kind of proof that it works as intended (perhaps show a screenshot)?
The student should provide at least one form of proof that their solution works. Example: In my teams github solution, we provided videos of our solution working on various devices and a slow/throttled network connection.
Rubric:
Proof: Does the student provide at least one form of proof that their solution works. (e.g., screenshot, gifs, videos, quotes from PR maintainer)
Don’t score grammar. On a scale from 1-10, rate how helpful their evidence is, and suggest better forms of proof if applicable. Provide feedback in 2 sentences: 1 for Proof, and 1 for overall feedback.`,
    "Blog Post Checkpoint #4 - Score": `From 1 to 5. Only use whole numbers.`
};

const SOSE_CH4_Data = {
    'Section5A': '',
    'Section5B': '',
    'Section5C': '',
    'Blog Post Checkpoint #4 - Score': 0
};

const SOSE_CH4_Rubric = `Purpose: Continue building your blog post

Steps:
- Respond to the three required questions in section 5 - Solution (and ideally the last optional question) - you can copy your responses from earlier discussion forums as a starting point and make any revisions.`;


// SOSE Checkpoint 5
const SOSE_CH5_Feedback = {
    'Section1': `Prompt:
The student was asked to explain their open-source project in three ways:
What is the project about and what platform is it built on?
Why is this project important?
Who are the typical users and what do they use it for?
Rubric:
Overview: Did the student clearly state the project’s name and platform?
Goal & Value: Did they describe the mission and what it improves?
User & Use Case: Did they describe the target user type and give a realistic example?
Feedback Instructions:
Ignore grammar. Focus on clarity, relevance, and completeness.
Respond in 6 sentences:
Feedback on project overview (name & platform)
Feedback on the mission or goal
Feedback on value or benefit
Feedback on user identification
Feedback on use case example
Overall summary of Section 1`,
    'Section2': `Prompt:
The student was asked to describe their assigned GitHub issue and explain its significance.
Rubric:
GitHub Link: Is it valid and working?
Issue Summary: Is the issue clearly described?
Clarity: Is the explanation logical and easy to follow?
Impact: Do they explain how the issue affects the project or users?
Feedback Instructions:
Ignore grammar. Focus on completeness and explanation quality.
Respond in 5 sentences:
GitHub link feedback
Issue summary feedback
Clarity of explanation
Impact of the issue
Overall summary of Section 2`,
    'Section3': `Prompt:
The student was asked to:
List the technologies used (tech stack)
Provide a system diagram
Describe one specific user-to-output workflow
Rubric:
Tools: Are tech stack components listed and explained?
Diagram: Is at least one stack component included visually?
Workflow: Is one clear use case explained end to end?
Backend: Is backend logic involved in the use case?
Result: Was the final output or result explained?
Feedback Instructions:
Ignore grammar. Focus on structure and clarity.
Respond in 6 sentences:
Feedback on the listed tools
Feedback on the diagram’s accuracy and components
Feedback on use-case definition
Feedback on backend processing description
Feedback on the result/output
Overall summary of Section 3`,
    'Section4': `Prompt:
The student was asked to reflect on technical or collaborative challenges and how they addressed them.
Rubric:
Challenge: Was a specific issue described?
Attempts: Were at least 3 problem-solving strategies listed?
Collaboration: Did they credit anyone who helped?
Status: Did they mention whether the issue is resolved?
Future Steps: Were next steps suggested if unresolved?
Feedback Instructions:
Ignore grammar. Focus on insight and problem-solving process.
Respond in 6 sentences:
Description of the challenge
Quality and quantity of attempts
Collaboration or credit for help
Status of resolution
Suggestions or next steps
Overall summary of Section 4`,
    'Section5': `Prompt:
The student was asked to describe their final solution and provide evidence of success.
Rubric:
Problem: Was the original issue described clearly?
Workflow: Was the solution process explained?
Effectiveness: Was the solution tied back to the problem?
Tech & Diagram Reference: Was one tech/framework and one diagram component referenced?
Proof: Did the student provide valid proof of success?
Feedback Instructions:
Ignore grammar. Focus on whether the solution was clear and well-supported.
Respond in 6 sentences:
Feedback on the problem explanation
Feedback on the workflow/process
Feedback on how the solution solved the issue
Feedback on tech/framework and system diagram references
Feedback on evidence or proof provided
Overall summary of Section 5`,
    'Blog Post Checkpoint #5 - Score (Can we recreate the solution by reading the blog)': `a technical blog post which describes a pull request for an open source project, on a scale of 1 - 5, tell me how likely it is that a developer if they read the blog post could recreate the solution only by following the steps described in the blog post.`
};

const SOSE_CH5_Data = {
    'Section1': '',
    'Section2': '',
    'Section3': '',
    'Section4': '',
    'Section5': '',
    'Blog Post Checkpoint #5 - Score (Can we recreate the solution by reading the blog)': 0
};

const SOSE_CH5_Rubric = `In the previous week, the goal was to create a draft of your blog post article and get it reviewed by your peers / mentor. Update your blog post based on the feedback you received and submit your final version here as a pdf document.`;
