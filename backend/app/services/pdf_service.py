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

        # Save uploaded PDF
        filename = f"{uuid.uuid4().hex}.pdf"
        file_path = UPLOAD_DIR / filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Open PDF
        pdf = fitz.open(file_path)
        page_count = len(pdf)

        page_chunks = []
        full_text = ""

        # Read every page
        for page_number, page in enumerate(pdf, start=1):

            page_text = page.get_text()
            full_text += page_text

            chunks = ChunkService.create_chunks(page_text)

            for chunk in chunks:
                page_chunks.append(
                    {
                        "text": chunk,
                        "page": page_number,
                    }
                )

        pdf.close()

        # Store embeddings in ChromaDB
        print("Original filename:", file.filename)
        print("Stored filename:", filename)

        ids = EmbeddingService.store_document(
            page_chunks=page_chunks,
            filename=file.filename,
            stored_name=filename,
        )

        print("Embedding stored successfully")
        return {
            "stored_name": filename,
            "pages": page_count,
            "characters": len(full_text),
            "chunks": len(page_chunks),
            "vector_ids": len(ids),
        }