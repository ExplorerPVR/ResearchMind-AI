from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.schemas.converter import ConvertRequest
from app.services.converter_service import ConverterService


router = APIRouter(
    prefix="/convert",
    tags=["Document Converter"],
)


@router.post("")
async def convert_document(request: ConvertRequest):

    filepath = ConverterService.convert(
        filename=request.filename,
        export_format=request.format,
    )

    return FileResponse(
        path=filepath,
        filename=filepath.split("\\")[-1],
        media_type="application/octet-stream",
    )