from pydantic import BaseModel


class SummaryRequest(BaseModel):
    filename: str


class SummaryResponse(BaseModel):
    summary: str