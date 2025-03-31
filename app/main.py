from fastapi import FastAPI
from app.canvas_API import router as canvas_router
from app.chatGPT_API import router as chatgpt_router

app = FastAPI(
    title="Mock API App",
    description="Simulates Canvas and ChatGPT API endpoints for testing purposes."
)

# Include routers for each mock service
app.include_router(canvas_router)
app.include_router(chatgpt_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="localhost", port=8000, reload=True)
