import uuid
import shutil
from pathlib import Path

import fitz
from fastapi import UploadFile

from app.services.chunk_service import ChunkService
from app.services.embedding_service import EmbeddingService

UPLOAD_DIR = Path("app/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


class PDFService:

    @staticmethod
    async def save_pdf(file: UploadFile):

        filename = f"{uuid.uuid4().hex}.pdf"
        file_path = UPLOAD_DIR / filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        pdf = fitz.open(file_path)

        page_count = len(pdf)

        text = ""

        for page in pdf:
            text += page.get_text()

        pdf.close()

        chunks = ChunkService.create_chunks(text)

        ids = EmbeddingService.store_document(
            chunks,
            file.filename
        )

        return {
            "stored_name": filename,
            "pages": page_count,
            "characters": len(text),
            "chunks": len(chunks),
            "vector_ids": len(ids),
        }