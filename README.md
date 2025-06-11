# GenAI Feedback Tool

An AI-powered grading pipeline that automates the evaluation of student blog posts using OpenAI's GPT models. Built to scale personalized, rubric-aligned feedback across 100+ students participating in the **Summer Open-Source Experience (SOSE)** and similar programs.

---

## 🚀 Overview

The GenAI Feedback Tool is a research-driven system designed to solve the challenge of delivering timely, high-quality feedback to a large student population. It automates the full feedback cycle:

- 🧾 Extracts student IDs from Google Sheets
- 📥 Fetches submission data from Canvas LMS via paginated APIs
- 📝 Parses blog content from Google Docs
- 🤖 Evaluates responses using fine-tuned GPT models with rubric prompts
- 📤 Writes scores and feedback to Google Sheets
- 🎯 (Optional) Posts grades and comments to Canvas Gradebook

---

## ✨ Key Features

- **Sheet-Aware ID Filtering**  
  Filters submissions using only student IDs listed in selected sheets (e.g., SOSE or Micro), improving performance with 150+ students.

- **Canvas LMS Integration**  
  Uses the Canvas Submissions API with pagination to collect metadata and submission history in bulk.

- **Google Docs Parsing**  
  Grabs `.txt` content from Docs (export URLs or via `DocumentApp.openById()` fallback).

- **OpenAI GPT Evaluation**  
  Uses fine-tuned GPT models and prompt engineering to produce rubric-aligned scores and feedback per section.

- **Google Sheets Automation**  
  Writes all feedback and scores back to the source roster sheet for transparency and review.

- **Email Drafting & Approval**  
  Auto-generates email drafts when feedback is ready and logs them in the sheet. Emails only send after instructor approval.

- **Canvas Grade Push (In Progress)**  
  Optional: Push scores/comments back to Canvas submission using TA API credentials.

- **Cron-Job Ready**  
  Can be run on a schedule (every 30–60 minutes) for near real-time grading.

---

## ⚙️ Technologies Used

- Google Apps Script (JavaScript)
- OpenAI API (GPT-3.5 / GPT-4 / fine-tuned models)
- Canvas LMS API (REST, with pagination)
- Google Docs API & DocumentApp
- Google Sheets API

---

## 📁 Project Structure

| File | Description |
|------|-------------|
| `Main.gs` | Orchestrates grading per checkpoint |
| `GenAI_Rating.gs` | Handles GPT scoring logic using structured prompts |
| `GetSubmissions.gs` | Interfaces with Canvas & Google Docs |
| `MicroRubric.gs` | Rubric definitions for Micro-Internship |
| `SOSERubric.gs` | Rubric definitions for SOSE |
| `EmailDrafter.gs` | Email drafting, approval, and status tracking |
| `pushToCanvas.gs` | (Optional) Pushes scores/comments to Canvas LMS |
| `README.md` | Project documentation and setup |

---

## 🧠 How It Works

1. ✅ **Select a Checkpoint + Sheet** (e.g., `SOSE CH1`, `Micro CH3`)
2. 📬 `GetSubmissions.gs` collects all Canvas submissions and parses Google Docs content.
3. 🤖 `GenAI_Rating.gs` loads the correct rubric, calls the fine-tuned GPT model, and returns JSON feedback.
4. 📊 `Main.gs` writes structured feedback and scores to the right columns in the sheet.
5. ✉️ `EmailDrafter.gs` checks for feedback completion and drafts personalized emails for students.
6. ✅ Instructor can review/edit and mark email for send-out.

---

## 🖼️ System Diagram

_Use this section to paste a screenshot or render of your full GenAI Feedback Tool architecture diagram. Include icons for Canvas, Google Docs, Sheets, GPT, and Email._

> 📎 You can paste or upload your image here in markdown:
```markdown
![System Diagram](./genai_feedback_diagram.png)
[GenAIFeedbackDiagram.pdf](https://ibb.co/bgHqG5M3)
