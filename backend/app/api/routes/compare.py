print("✅ Compare Route Loaded")
from fastapi import APIRouter

from app.schemas.compare import CompareRequest, CompareResponse
from app.services.compare_service import CompareService

router = APIRouter(
    prefix="/compare",
    tags=["Compare"],
)

@router.post("", response_model=CompareResponse)
async def compare_papers(request: CompareRequest):

    comparison = await CompareService.compare(
        request.filenames
    )

    return CompareResponse(
        comparison=comparison
    )