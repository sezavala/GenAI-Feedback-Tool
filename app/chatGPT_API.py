import io
from openai import OpenAI
from fastapi import UploadFile, FastAPI, APIRouter, HTTPException, File
from fastapi.responses import JSONResponse

client = OpenAI()
router = APIRouter()

def simulate_chatgpt_evaluation(file_content: bytes):
    """
    simulate chatGPT response
    :param file_content
    :return chatGPT JSON response
    """
    return {
        "score": 85,
        "feedback": "Great job overall, but consider adding more detailed examples."
    }

@router.get("/evaluate_prod")
async def evaluate_production(upload: UploadFile = File(...)):
    """
    Evaluate a hard-coded file using the OpenAI API.
    """
    try:
        with upload.file as f:
            file_bytes = f.read()

        file_stream = io.BytesIO(file_bytes)
        file_stream.name = "example.pdf"

        file_obj = client.files.create(
            file=file_stream,
            purpose="user_data"
        )

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "developer",
                    "content": (
                        "Format response like this:\n"
                        "Section {Section num}:\n"
                        "{question letter}. {requirements met/not met}\n"
                        "Score: {score from (1-10)} #for each letter\n"
                        "Feedback: {short feedback} #for each letter\n"
                        "\n"
                        "Overall feedback: {overall feedback}\n"
                        "Overall score: {overall score 1-5}\n"
                    )
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "file",
                            "file": {
                                "file_id": file_obj.id,
                            }
                        },
                        {
                            "type": "text",
                            "text": (
                                "Rubric for this assignment is:\n"
                                "Students are assigned different open-source projects. For this assignment, they need to answer the questions that will help them document their open-source experience.\n"
                                "Be sure to provide feedback if the student needs to explain more for their audience, or if their answer needs any help.\n"
                                "Respond to three required questions (A, B, and C) in section 1 - About the project.\n"
                                "Respond to two required questions (A and B) in section 2 - The issue.\n"
                            )
                        }
                    ]
                }
            ]
        )
        return JSONResponse(content={"evaluation": completion.choices[0].message.content})
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/evaluate")
async def evaluate_simulation(upload: UploadFile = File(...)):
    """
    Simulated endpoint to evaluate an uploaded file.
    Reads the uploaded file and returns dummy evaluation results.
    """
    try:
        # Read file content (simulate processing the file)
        content = await upload.read()
        evaluation = simulate_chatgpt_evaluation(content)
        return JSONResponse(content=evaluation)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))