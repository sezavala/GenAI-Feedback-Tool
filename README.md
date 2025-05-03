# GenAI Feedback Tool

An AI-powered system that automates the evaluation of student blog posts using OpenAI's GPT models, designed to scale personalized feedback during the **Summer Open-Source Experience (SOSE)** and similar educational programs.

## Overview

The GenAI Feedback Tool is a research-driven project developed to solve the problem of providing timely, consistent, and rubric-aligned feedback to 100+ students writing blog posts throughout the summer. The tool automates:

- Fetching student submissions from Canvas LMS
- Parsing Google Docs for blog content
- Evaluating content using OpenAI's function-calling via GPT
- Writing structured scores and feedback back to Google Sheets

## Key Features

- **Canvas LMS Integration**: Pulls submission metadata and student identifiers securely via the Canvas API.
- **Google Docs Parsing**: Extracts text from student-linked Google Docs using the export API.
- **OpenAI GPT Evaluation**: Uses fine-tuned GPT models with function-calling for structured, rubric-based feedback.
- **Google Sheets Automation**: Writes feedback and scores back to Google Sheets for easy instructor access.
- **Cron Job Support**: Designed to run every 30–60 minutes for real-time grading during high-volume periods.

## Technologies Used

- Google Apps Script (JavaScript)
- OpenAI API (GPT-3.5 Turbo + Function Calling)
- Canvas LMS API
- Google Docs API
- Google Sheets Automation

## Project Structure
├── Main.gs                # Main entry point; connects modules 

├── GenAI_Rating.gs        # Core GPT interaction and scoring logic 

├── New_Submission.gs      # Canvas + Google Docs integration

## How It Works

1. `New_Submission.gs` fetches recent Canvas submissions and extracts blog text from Google Docs.
2. `GenAI_Rating.gs` builds a rubric-aligned evaluation prompt and uses GPT to return structured feedback via function-calling.
3. `Main.gs` schedules and manages the full flow, writing the results into Sheets for review.

## Currently Working On

- Canvas write-back support (gradebook updates)

## License

This project is under development for educational use through the Computing Talent Initiative and is currently unpublished. 

---

Made with purpose by **Sergio Zavala**  
[LinkedIn](https://www.linkedin.com/in/sergiozavala1) • [Website](https://sergiozavala.dev) • [GitHub](https://github.com/sezavala)
