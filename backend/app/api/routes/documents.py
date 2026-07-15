from fastapi import APIRouter, File, UploadFile

from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    result = await DocumentService.upload_document(file)

    return DocumentResponse(
        success=True,
        filename=result["filename"],
        stored_name=result["stored_name"],
        size=result["size"],
        pages=result["page_count"],
        characters=result["character_count"],
        message="PDF uploaded and processed successfully.",
    )