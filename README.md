# GenAI Feedback Tool

An AI-powered grading pipeline that automates the evaluation of student blog posts using OpenAI's GPT models. Built to scale personalized, rubric-aligned feedback across 100+ students participating in the **Summer Open-Source Experience (SOSE)** and similar programs.

## Overview

The GenAI Feedback Tool is a research-driven system developed to address the challenge of delivering timely, high-quality feedback to a growing student population. It automates the full feedback cycle:

- Extracting student IDs from Google Sheets
- Fetching submission data from Canvas LMS (with paginated API handling)
- Parsing blog content from Google Docs
- Evaluating responses with fine-tuned GPT using custom rubrics
- Writing scores and feedback back into Google Sheets
- (Optional) Posting grades and comments to Canvas directly

## Key Features

- **Sheet-aware ID Filtering**: Grabs only students from specified sheets, improving performance when handling 250+ IDs.
- **Canvas LMS Integration**: Pulls submission metadata and submission history using efficient batch pagination.
- **Google Docs Parsing**: Extracts and cleans blog content using Google Docs export URLs.
- **OpenAI GPT Evaluation**: Uses fine-tuned GPT models and carefully crafted prompts to deliver section-specific feedback and scores.
- **Google Sheets Automation**: Writes structured responses, scores, and feedback back to the original roster sheets.
- **Canvas Gradebook Push (In Progress)**: Posts scores and comments back into Canvas using authorized TA credentials.
- **Cron Job Ready**: Can be scheduled to run every 30–60 minutes to provide real-time grading at scale.

## Technologies Used

- Google Apps Script (JavaScript)
- OpenAI API (GPT-3.5 Turbo + Function Calling)
- Canvas LMS API (with pagination)
- Google Docs Export API
- Google Sheets Automation

## Project Structure

- `Main.gs` — Main entry point; connects modules  
- `GenAI_Rating.gs` — GPT scoring logic using rubric prompts  
- `New_Submissions.gs` — Canvas + Google Docs integration logic  
- `Micro_Rubric.gs` — Section-specific prompt content  
- `pushToCanvas.gs` — Posts grades/comments back to Canvas (in progress)

## How It Works

1. **New_Submissions.gs** uses a paginated Canvas API fetch to collect all submissions, then filters by Canvas IDs listed in each Micro-Internship Sheet.
2. **GenAI_Rating.gs** generates structured prompts per rubric section, calls GPT via the OpenAI API, and interprets results.
3. **Main.gs** coordinates which checkpoints to run and what sections to grade.
4. **(Optional)** `pushToCanvas.gs` pushes scores and comments back to Canvas using the submission comment API.

## Currently Working On

- Finalizing Canvas write-back integration
- Strict handling of blank submissions (auto-score: 0)
- Generating a feedback summary section using GPT
- Building out Checkpoint 2 & 3 rubrics

## License

This project is under development for educational use through the Computing Talent Initiative (CTI) and CSU Monterey Bay. It is not yet publicly licensed or distributed.

---

Made with purpose by **Sergio Zavala**  
[LinkedIn](https://www.linkedin.com/in/sergiozavala1) • [Website](https://sergiozavala.dev) • [GitHub](https://github.com/sezavala)

