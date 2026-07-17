from fastapi import APIRouter, File, UploadFile

from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService
from app.services.library_service import LibraryService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# -----------------------------
# Upload PDF
# -----------------------------
@router.post("/upload", response_model=DocumentResponse)
async def upload_document(file: UploadFile = File(...)):

    result = await DocumentService.upload_document(file)

    return DocumentResponse(
        success=True,
        filename=result["filename"],
        stored_name=result["stored_name"],
        size=result["size"],
        pages=result["pages"],
        characters=result["characters"],
        chunks=result["chunks"],
        vectors=result["vector_ids"],
        message="PDF uploaded, indexed and ready for AI."
    )
    
    
# -----------------------------
# Delete Documents
# -----------------------------  
@router.delete("/{filename}")
async def delete_document(filename: str):

    return LibraryService.delete_document(filename) 

# -----------------------------
# Get All Uploaded Documents
# -----------------------------
@router.get("")
async def get_documents():

    return {
        "documents": LibraryService.get_documents()
    }