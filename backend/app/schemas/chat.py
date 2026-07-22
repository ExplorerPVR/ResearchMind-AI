from typing import List
from pydantic import BaseModel


class ChatRequest(BaseModel):

    session_id: str

    question: str


class ChatResponse(BaseModel):

    answer: str

    sources: List[str]

    timestamp: str | None = None

    session_id: str | None = None