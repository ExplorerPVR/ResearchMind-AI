from fastapi import APIRouter

from app.schemas.citation import (
    CitationRequest,
    CitationResponse,
)

from app.services.citation_service import CitationService

router = APIRouter(
    prefix="/citation",
    tags=["Citation"],
)


@router.post(
    "",
    response_model=CitationResponse,
)
async def generate(request: CitationRequest):

    result = await CitationService.generate(
        request.filename
    )

    return CitationResponse(
        apa=result["apa"],
        ieee=result["ieee"],
        mla=result["mla"],
        chicago=result["chicago"],
        harvard=result["harvard"],
        bibtex=result["bibtex"],
    )