from pydantic import BaseModel


class CompareRequest(BaseModel):
    filenames: list[str]


class CompareResponse(BaseModel):
    comparison: str