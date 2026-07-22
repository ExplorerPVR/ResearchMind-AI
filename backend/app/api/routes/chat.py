from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService
from app.services.chat_history_service import ChatHistoryService

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):

    try:

        print("Incoming Chat Request")
        print("Session:", request.session_id)
        print("Question:", request.question)

        result = await ChatService.chat(
            request.session_id,
            request.question,
        )

        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"],
        )

    except Exception as e:

        print("CHAT ERROR:", e)

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )


@router.post("/new")
async def create_chat():

    try:

        session = ChatHistoryService.create_session()

        print("Created Session:", session["id"])

        return {
            "success": True,
            "session": session,
        }

    except Exception as e:

        print("CREATE CHAT ERROR:", e)

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )


@router.get("/sessions")
async def get_chat_sessions():

    try:

        return {
            "success": True,
            "sessions": ChatHistoryService.get_sessions(),
        }

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )


@router.get("/{session_id}")
async def get_chat(session_id: str):

    try:

        return {
            "success": True,
            "session": ChatHistoryService.get_session(session_id),
        }

    except Exception as e:

        print("LOAD CHAT ERROR:", e)

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )


@router.delete("/{session_id}")
async def delete_chat(session_id: str):

    try:

        ChatHistoryService.delete_session(session_id)

        return {
            "success": True,
        }

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )


@router.put("/{session_id}/rename")
async def rename_chat(
    session_id: str,
    title: str,
):

    try:

        ChatHistoryService.rename_session(
            session_id,
            title,
        )

        return {
            "success": True,
        }

    except Exception as e:

        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": str(e),
            },
        )