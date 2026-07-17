from fastapi import APIRouter

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):

    result = await ChatService.chat(
        request.session_id,
        request.question
    )

    return ChatResponse(
    answer=result["answer"],
    sources=list(set(result["sources"]))
)