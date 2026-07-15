from pathlib import Path
from uuid import uuid4
import shutil

from fastapi import HTTPException, UploadFile

from app.core.config import settings


UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class UploadService:

    ALLOWED_EXTENSIONS = {".pdf"}

    @staticmethod
    def validate_file(file: UploadFile):

        if file.filename is None:
            raise HTTPException(
                status_code=400,
                detail="Filename is missing."
            )

        extension = Path(file.filename).suffix.lower()

        if extension not in UploadService.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

    @staticmethod
    async def save_file(file: UploadFile):

        UploadService.validate_file(file)

        extension = Path(file.filename).suffix.lower()

        unique_name = f"{uuid4().hex}{extension}"

        save_path = UPLOAD_DIR / unique_name

        with open(save_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {
            "filename": file.filename,
            "stored_name": unique_name,
            "path": str(save_path),
            "size": save_path.stat().st_size
        }