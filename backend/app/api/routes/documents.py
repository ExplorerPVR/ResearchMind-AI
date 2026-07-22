from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse

from app.schemas.document import DocumentResponse
from app.services.document_service import DocumentService
from app.services.library_service import LibraryService
from app.services.search_service import SearchService
from app.services.semantic_search_service import SemanticSearchService

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


# ----------------------------------
# Upload PDF
# ----------------------------------
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


# ----------------------------------
# Get All Documents
# ----------------------------------
@router.get("")
async def get_documents():

    return {
        "documents": LibraryService.get_documents()
    }
    
# ----------------------------------
# Search Document
# ----------------------------------   
@router.get("/search/{query}")
async def search_documents(query: str):

    return {
        "documents": SearchService.search_documents(query)
    }

# ----------------------------------
# SemanticSearch Document
# ----------------------------------   
@router.get("/semantic-search/{query}")
async def semantic_search(query: str):

    documents = SemanticSearchService.search(query)

    return {
        "success": True,
        "documents": documents,
        "count": len(documents),
    }

# ----------------------------------
# Delete Document
# ----------------------------------
@router.delete("/{filename}")
async def delete_document(filename: str):

    return LibraryService.delete_document(filename)


# ----------------------------------
# View PDF
# ----------------------------------
@router.get("/view/{filename}")
async def view_document(filename: str):

    pdf_path = LibraryService.get_pdf_path(filename)

    if pdf_path is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'inline; filename="{filename}"'
        }
    )


# ----------------------------------
# Download PDF
# ----------------------------------
@router.get("/download/{filename}")
async def download_document(filename: str):

    pdf_path = LibraryService.get_pdf_path(filename)

    if pdf_path is None:
        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    return FileResponse(
        path=pdf_path,
        media_type="application/pdf",
        filename=filename,
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"'
        }
    )