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
    def store_document(
        cls,
        page_chunks: list,
        filename: str,
        stored_name: str,
    ):

        print("🔥 NEW EMBEDDING SERVICE IS RUNNING 🔥")
        print("=" * 60)
        print("EmbeddingService is running")
        print("Filename:", filename)
        print("Stored Name:", stored_name)
        print("=" * 60)

        ids = []

        # Extract text from each chunk
        texts = [item["text"] for item in page_chunks]

        # Generate embeddings
        vectors = cls.embeddings.embed_documents(texts)

        # Store in ChromaDB
        for item, vector in zip(page_chunks, vectors):

            chunk_id = str(uuid.uuid4())

            metadata = {
                "filename": filename,
                "stored_name": stored_name,
                "page": item["page"],
                "document": filename,
            }

            print("Saving metadata:")
            print(metadata)

            collection.add(
                ids=[chunk_id],
                embeddings=[vector],
                documents=[item["text"]],
                metadatas=[metadata],
            )

            ids.append(chunk_id)

        return ids