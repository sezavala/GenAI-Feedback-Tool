from openai import OpenAI
from fastapi import UploadFile, FastAPI

client = OpenAI()
app = FastAPI()


'''
API for ChatGPT API
'''
@app.get("/evaluate")
def evaluate(upload: UploadFile):
    """
    Evaluate an uploaded file
    :param upload:
    :return chatGPT evaluation:
    """
    file = client.files.create(
        file=upload.file,
        purpose="user_data"
    )

    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "file",
                        "file": {
                            "file_id": file.id,
                        }
                    },
                    {
                        "type": "text",
                        "text": "What is the first dragon in the book?",
                    },
                ]
            }
        ]
    )

    return completion.choices[0].message.content