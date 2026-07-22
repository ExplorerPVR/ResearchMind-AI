from pydantic import BaseModel


class ExportRequest(BaseModel):

    title: str

    content: str

    format: str


class ExportResponse(BaseModel):

    filename: str