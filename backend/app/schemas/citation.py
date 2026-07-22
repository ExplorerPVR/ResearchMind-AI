from pydantic import BaseModel


class CitationRequest(BaseModel):
    filename: str


class CitationResponse(BaseModel):
    apa: str
    ieee: str
    mla: str
    chicago: str
    harvard: str
    bibtex: str