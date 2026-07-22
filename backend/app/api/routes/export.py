import os

from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.schemas.export import ExportRequest
from app.services.export_service import ExportService


router = APIRouter(
    prefix="/export",
    tags=["Export"],
)


@router.post("")
async def export_file(request: ExportRequest):

    filepath = ExportService.export(
        request.title,
        request.content,
        request.format,
    )

    return FileResponse(
        filepath,
        filename=os.path.basename(filepath),
        media_type="application/octet-stream",
    )