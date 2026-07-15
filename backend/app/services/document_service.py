from fastapi import UploadFile

from app.services.upload_service import UploadService
from app.services.pdf_service import PDFService


class DocumentService:

    @staticmethod
    async def upload_document(file: UploadFile):

        upload_result = await UploadService.save_file(file)

        pdf_result = PDFService.extract_text(upload_result["path"])

        return {
            **upload_result,
            **pdf_result
        }