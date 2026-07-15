from pydantic import BaseModel


class DocumentResponse(BaseModel):
    success: bool
    filename: str
    stored_name: str
    size: int
    pages: int
    characters: int
    message: str