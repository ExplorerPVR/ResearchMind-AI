import uuid

from langchain_google_genai import GoogleGenerativeAIEmbeddings

from app.core.config import settings
from app.rag.vector_store import collection


class EmbeddingService:

    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        google_api_key=settings.GOOGLE_API_KEY,
    )

    @classmethod
    def store_document(cls, chunks: list[str], filename: str):

        ids = []
        vectors = cls.embeddings.embed_documents(chunks)

        for chunk, vector in zip(chunks, vectors):

            chunk_id = str(uuid.uuid4())

            collection.add(
                ids=[chunk_id],
                embeddings=[vector],
                documents=[chunk],
                metadatas=[
                    {
                        "filename": filename
                    }
                ],
            )

            ids.append(chunk_id)

        return ids