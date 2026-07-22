from fastapi import APIRouter

from app.schemas.summary import (
    SummaryRequest,
    SummaryResponse,
)
from app.services.summary_service import SummaryService

router = APIRouter(
    prefix="/summary",
    tags=["Summary"],
)


@router.post(
    "",
    response_model=SummaryResponse,
)
async def generate_summary(
    request: SummaryRequest,
):

    summary = await SummaryService.generate_summary(
        request.filename
    )

    return SummaryResponse(
        summary=summary
    )