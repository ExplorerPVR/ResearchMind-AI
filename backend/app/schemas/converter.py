from pydantic import BaseModel


class ConvertRequest(BaseModel):
    filename: str
    format: str