from fastapi import APIRouter, Request, HTTPException
import uvicorn

router = APIRouter()

'''
API for Canvas API
'''
@router.put("/api/v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}")
async def update_submission(course_id: int, assignment_id: int, user_id: int, request: Request):
    """
    update submission grade and add feedback.
    :param course ID, assignment ID, and user ID:
    :return feedback with submission grade:
    """
    try:
        payload = await request.json()
        print(f"Received update for Course {course_id}, Assignment {assignment_id}, User {user_id}:")
        print(payload)
        # Simulate a successful Canvas API response
        return {
            "status": "success",
            "message": "Submission updated successfully",
            "data": payload
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
